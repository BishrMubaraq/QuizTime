var express = require('express');
const { render } = require('express/lib/response');
var router = express.Router();
var categoryHelpers=require('../helpers/category-helpers')
const userHelpers = require('../helpers/user-helpers');


/* Admin Panel */
router.get('/', function(req, res, next) {
  categoryHelpers.getAllCategories().then((categories)=>{
    res.render('admin/admin-home',{admin:true,categories});
  })
  
});


// Add or Edit Category

router.get('/add-category',(req,res)=>{
  res.render('admin/add-category',{admin:true})
})

router.post('/add-category',(req,res)=>{
  categoryHelpers.addCategory(req.body).then(()=>{
    res.redirect('/admin') 
  })
});

// View Users

router.get('/view-users',(req,res)=>{
  userHelpers.getAllUsers().then((usersData)=>{
    res.render('admin/view-users',{admin:true,usersData})
  })
})



module.exports = router;
