var express = require('express');
var router = express.Router();
const categoryHelpers = require('../helpers/category-helpers');
const userHelpers = require('../helpers/user-helpers');


/* GET home page. */
router.get('/', function(req, res, next) {
  categoryHelpers.getAllCategories().then((categories)=>{
    res.render('user/home',{user:true,categories});
  })
});

// Login page

router.get('/login',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/')
  }else{
    res.render('user/login',{login:true,"LoginErr":req.session.loginErr})
    req.session.loginErr=false
  }
});

router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }else{
      req.session.loginErr=true
      res.redirect('/login')
    }
  })
});


// Signup page
router.get('/signup',(req,res)=>{
  res.render('user/signup',{user:true})
})

router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((response)=>{
    req.session.loggedIn=true
    req.session.user=response
    res.redirect('/')
  })
})
module.exports = router;
