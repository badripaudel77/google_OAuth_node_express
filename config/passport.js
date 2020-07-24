const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const keys = require('./keys');
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: keys.googleValues.clientID,
    clientSecret: keys.googleValues.clientSecret,
    callbackURL: "/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {  
    //passport callback function
   // console.log(profile);

     const NewUser = new User({
        googleId : profile.id,
        displayName : profile.displayName,
        image : profile.photos[0].value
     });
   
        try {
            let user = await User.findOne({googleId : profile.id});
            //if user already exists
            if(user) {
                   // done(null, user);
                   console.log("already registered" + user);
            }
            //create new user
            else {
                  await User.create(NewUser);
                   //done(null, user);
                   console.log("registered " + NewUser);
                 }
        }
         catch (error) {
            console.log("error occured while connecting to your google account , try again " + error);
        }
 }
));