const express = require('express');

const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
// app.use(express.json()); 
// app.use(express.urlencoded({ extended: true })); 
const adminLayout='../views/layouts/admin';
// GET Admin Login-Page 

router.get('/admin', async (req, res) => {
    try {
        const locals = {
            title: "Admin",
            description: "Simple Blog created with NodeJs, Express & MongoDb."
        }
        res.render('admin/index', { locals,layout:adminLayout});
    } catch (error) {
        console.log(error);
    }

});




// POST Admin-checkLogin

router.post('/admin', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("Username:", username);
        console.log("Password:", password);
        res.redirect('/admin');
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;