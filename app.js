const express = require('express');

const passportConfig = require('./config/passport');
const authRoutes = require('./routes/auth');
const db = require('./config/db');
const app = express();


//set view engine
app.set('view engine', 'ejs');

//set route 
app.use("/auth", authRoutes);

//route /
app.get("/", (req, res) => {
    res.render('welcome');
});

db();

const PORT = process.env.PORT || 5000;
app.listen(5000, () => console.log(`server is running at port ${PORT}`));