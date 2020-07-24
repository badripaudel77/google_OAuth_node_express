const passport = require('passport');

const router = require('express').Router();

router.get("/login", (req, res) => {
    res.render('login')
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

router.get("/google", passport.authenticate('google', { scope : ['profile']}));

router.get("/google/callback", 
            passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
     //    res.send(req.user);
       res.redirect('/profile/');

});

module.exports = router;