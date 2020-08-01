const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//1 argument in mongoose.model() = pull out
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null,user.id);
});

passport.deserializeUser((id,done) => {
    User.findById(id).then(user => {
            done(null,user);
    });
});

//create new google strategy
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
            //find if the user already existed or not
            const existingUser = await User.findOne({googleId: profile.id })
            if(existingUser) {
                //we already have a record with the given profile ID
                done(null,existingUser);
            } else {
                //we dont have a user record with this ID, make a new record
                const user = await new User({ googleId: profile.id }).save() //since this returns a promise => need a then() function
                done(null,user);
            }
        }
    )
);