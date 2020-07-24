const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');

const passportConfig = require('./config/passport');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const db = require('./config/db');
const keys = require('./config/keys');
const app = express();

const MILLISECONDS_IN_DAY = 24*60*60*1000;
//set view engine
app.set('view engine', 'ejs');

//use session
app.use(cookieSession({
    maxAge : MILLISECONDS_IN_DAY,
    keys : [keys.cookieSession] //encrypt the id
}))
//initialize passport
app.use(passport.initialize())

app.use(passport.session());

//set routes 
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

//route /
app.get("/", (req, res) => {
    res.render('welcome');
});

db();

const PORT = process.env.PORT || 5000;
app.listen(5000, () => console.log(`server is running at port ${PORT}`));