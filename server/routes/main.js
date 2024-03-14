const express= require('express');

const router=express.Router();


router.get('',(req,res)=>{
    const locals={
        title:"nodeJs Blog",
        description:"simple blog using nodeJs,express and mongoose"
    }
    res.render('index',{locals});
});

router.get('/about',(req,res)=>{
    res.render('about');
});

module.exports=router
