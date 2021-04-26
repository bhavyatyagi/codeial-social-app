const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new strategy for google login 
passport.use(new googleStrategy({
    clientID: "966945793134-5etncgjor1ok8bkvpb2tqr4q8f2otlq7.apps.googleusercontent.com",
    clientSecret: "wem0moYdOHR7rvHl76e3dxfs",
    callbackURL: "http://localhost:8000/users/auth/google/callback",

},
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ email: profile.emails(0).value }).exec(function (error, user) {
            if (error) {
                console.log('*****ERROR in google strategy apssport', error);
                return;
            }
            console.log(profile);
            if (user) {
                // if found then set this user as req.user 
                return done(null, user);
            }
            else {
                // if not found create the user and set it as req.user / sign in that user
                User.create({
                    name: profile.displayName,
                    email: profile.emails(0).value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function (error, user) {
                    if (error) { console.log('ERROR in creating google strategy pasport', error); return; }
                    return done(null, user);
                });
            }
        });
    }
));


module.exports = passport;