const express = require('express');

const router = express.Router();
const Post = require('../models/Post');

router.get('', async(req, res) => {
    try {
        const locals={
            title:"NodeJs Blog",
            description:"Simple Blog using Express and MongoDb"
        }
        let perPage =5;
        let page = req.query.page || 1; //sets the deafult page as 1
        const data = await Post.aggregate([{$sort:{createdAt:-1}}])
        .skip(perPage* page - perPage)
        .limit(perPage)
        .exec();


        const count = await Post.countDocuments({});
        const nextPage = parseInt(page)+1;
        const hasNextPage = nextPage<=Math.ceil(count/perPage);
        res.render('index',{
            locals,
            data,
            current:page,
            nextPage:hasNextPage? nextPage : null,
            currentRoute:'/'
        })
    } catch (error) {
        console.log(error);
    }




    
});


//POST request
//post--searchTerm

// router.post('../views/search', async (req, res) => {
//     try {
//     const locals = {
//         title: "Search",
//         description: "Simple Blog created with NodeJs, Express & MongoDb."
//     }
//     let searchTerm = req.body.searchTerm;
//     const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

//     const data = await Post.find({
//         $or: [
//         { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
//         { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
//         ]
//     });

//     res.render("search", {
//         data,
//         locals,
//         currentRoute: '/'
//     });
//     } catch (error) {
//         console.log(error);
//     }
// });
router.post('/search', async (req, res) => {
    try {
        const locals = {
            title: "Search",
            description: "Simple Blog using Express and MongoDb"
        }
        let searchTerm = req.body.searchTerm;

        // Remove special characters from search term
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

        // Create a case-insensitive search term
        const caseInsensitiveSearchTerm = searchNoSpecialChar.toLowerCase();

        // Fetch posts from the database and filter based on the modified search term
        const posts = await Post.find();
        const filteredPosts = posts.filter(post =>
            post.title.toLowerCase().includes(caseInsensitiveSearchTerm) ||
            post.body.toLowerCase().includes(caseInsensitiveSearchTerm)
        );

        res.render("search", {
            data: filteredPosts,
            locals,
            currentRoute: '/'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});





// get 
// Post:id
router.get('/post/:id',async(req,res)=>{
    try {
        let slug=req.params.id;
        const data = await Post.findById({_id:slug});
        const locals={
            title:data.title,
            description:"Simple Blog using Express and MongoDb"
        }
        res.render('post',{
            locals,
            data,
            currentRoute:`/post/${slug}`
        });
    } catch (error) {
        console.log(error);
    }
});




router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router
    // function insertPostData() {
    //     Post.insertMany([
    //         {
    //             title: "Building APIs with Node.js",
    //             body: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js"
    //         },
    //         {
    //             title: "Deployment of Node.js applications",
    //             body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments..."
    //         },
    //         {
    //             title: "Authentication and Authorization in Node.js",
    //             body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries."
    //         },
    //         {
    //             title: "Understand how to work with MongoDB and Mongoose",
    //             body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
    //         },
    //         {
    //             title: "build real-time, event-driven applications in Node.js",
    //             body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js."
    //         },
    //         {
    //             title: "Discover how to use Express.js",
    //             body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
    //         },
    //         {
    //             title: "Asynchronous Programming with Node.js",
    //             body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations."
    //         },
    //         {
    //             title: "Learn the basics of Node.js and its architecture",
    //             body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers."
    //         },
    //         {
    //             title: "NodeJs Limiting Network Traffic",
    //             body: "Learn how to limit netowrk traffic."
    //         },
    //         {
    //             title: "Learn Morgan - HTTP Request logger for NodeJs",
    //             body: "Learn Morgan."
    //         },
    //     ])
    // }
    
    // insertPostData();
    
