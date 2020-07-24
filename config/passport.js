const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const keys = require('./keys');
const User = require('../models/User');

 //add these two methods
 passport.serializeUser((user, done) => {
    done(null, user.id);
  })

  passport.deserializeUser((id, done) => {
   User.findById(id).then(user => {
       done(null, user);
    });
});

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
                   console.log("already registered" + user);
                   done(null, user); //go to serializeUser

            }
            //create new user
            else {
                  await User.create(NewUser);
                   console.log("registered " + NewUser);
                  done(null, NewUser);
                 }
        }
         catch (error) {
            console.log("error occured while connecting to your google account , try again " + error);
        }
 }
));