const passport = require("passport");
const TwitterStrategy = require("passport-twitter-oauth2").Strategy;
const User = require("../models/Users"); // Make sure to import the User model
require("dotenv").config();

passport.use(
  new TwitterStrategy(
    {
      clientID: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      callbackURL: process.env.TWITTER_CALLBACK_URL,
      includeEmail: true,
      scope: ["tweet.read", "users.read", "offline.access"],
    },
    (accessToken, refreshToken, profile, done) => {
      // Console log for debugging
      console.log("Twitter authentication successful, profile:", profile.id);
      
      User.findOne({ twitterId: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            console.log("Existing user found:", existingUser.userName);
            return done(null, existingUser);
          } else {
            console.log("Creating new user with Twitter profile");
            const newUser = new User({
              twitterId: profile.id,
              userName: profile.displayName,
              email: profile.emails?.[0]?.value || "", // Handle missing email case
            });
    
            newUser.save().then((user) => {
              console.log("New user created:", user.userName);
              done(null, user);
            });
          }
        })
        .catch((err) => {
          console.error("Error during Twitter authentication:", err);
          done(err);
        });
    }    
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});

module.exports = passport;