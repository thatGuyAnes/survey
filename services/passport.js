const mongoose = require( 'mongoose' );
const passport = require( 'passport' );
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
const keys = require( '../config/keys' );
const User = mongoose.model( 'users' );

// Serialisation
passport.serializeUser( ( user, done ) => {
  done( null, user.id )
} );

// Deserialisation
passport.deserializeUser( ( id, done ) => {
  User.findById( id )
    .then( ( user ) => {
      done( null, user )
    } )
} );

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    ( accessToken, refreshToken, profile, done ) => { // This CB is fired the moment a user is sent back from google after granting access to our application.
      User.findOne( { googleId: profile.id } )
        .then( ( existingUser ) => {
          if ( existingUser ) {
            // we already have a user with the existing Id
            done( null, existingUser );
          } else { // Adds a new user to the database
            new User( { googleId: profile.id } )
              .save()
              .then( user => done( null, user ) )
          }
        } )
      // new User( { googleId: profile.id } ).save();
    }
  )
);
