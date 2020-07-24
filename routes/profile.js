const router = require('express').Router();

const checkAuth = require('../middleware/checkAuth');

router.get("/", checkAuth, (req, res) => {
    res.render("profile");
});


module.exports = router;