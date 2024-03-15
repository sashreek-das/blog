require('dotenv').config();

const express = require('express');
const app = express();

const expressLayout = require('express-ejs-layouts');
const connectDB=require('./server/config/db');
const PORT = 5000 || process.env.PORT;

// connectDB();
app.use(express.static('public'));


//templaing engine;
app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine','ejs');



app.use('/',require('./server/routes/main'))
app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`);
});