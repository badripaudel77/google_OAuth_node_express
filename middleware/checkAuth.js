const { checkout } = require("../routes/auth");

const checkAuth = (req, res, next) => {
   if(!req.user) {
      // next();
      res.redirect("/profile");
   }
   else {
       next(); //go to next code .....
   }
}

module.exports = checkAuth;