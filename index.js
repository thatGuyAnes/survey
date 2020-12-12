const express = require( 'express' );
const passport = require( 'passport' );
const GoogleOath = require( 'passport-google-oauth20' );

const app = express();
passport.use( GoogleOath(  ) );

const PORT = process.env.PORT || 5000;
app.listen(PORT);
