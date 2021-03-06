const express = require( 'express' );
const mongoose = require( 'mongoose' );
const cookieSession = require( 'cookie-session' );
const passport = require( 'passport' );
const keys = require( './config/keys' );
require( './models/User' );
require( './services/passport' );

mongoose.connect( keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } );

const app = express();

// Setting up express to use cookies
app.use( cookieSession( {
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
} ) );
app.use( passport.initialize() );
app.use( passport.session() );

// auth route handler
require( './routes/authRoutes' )( app );

const PORT = process.env.PORT || 5000;
app.listen( PORT, () => { console.log( `listening on port: ${PORT}` ) } );
