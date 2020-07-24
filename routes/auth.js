const passport = require('passport');

const router = require('express').Router();

router.get("/login", (req, res) => {
    res.render('login')
});

router.get("/logout", (req, res) => {
  req.logOut();
});

router.get("/google", passport.authenticate('google', { scope : ['profile']}));

router.get("/google/callback", 
            passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
   res.send("done");
});

module.exports = router;