require('dotenv').config();

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const expressLayout = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const PORT = 5000 || process.env.PORT;

connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
}));
//templaing engine;
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');



app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});