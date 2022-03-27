var express = require('express');
const { render } = require('express/lib/response');
var router = express.Router();
var categoryHelpers=require('../helpers/category-helpers')
const userHelpers = require('../helpers/user-helpers');
var questionHelpers =require('../helpers/question-helpers');


/* Admin Panel */
router.get('/', function(req, res, next) {
  categoryHelpers.getAllCategories().then((categories)=>{
    res.render('admin/admin-home',{admin:true,categories});
  })
  
});


// Add Category

router.get('/add-category',(req,res)=>{
  res.render('admin/add-category',{admin:true})
})

router.post('/add-category',(req,res)=>{
  categoryHelpers.addCategory(req.body).then(()=>{
    res.redirect('/admin') 
  })
});

// Edit Category
router.get('/edit-category',(req,res)=>{
  categoryHelpers.getCategoryDetails(req.query.id).then((category)=>{
    res.render('admin/edit-category',{admin:true,category})
  })

})
router.post('/edit-category',(req,res)=>{
  let catId =req.query.id
  categoryHelpers.updateCategory(catId,req.body).then(()=>{
    res.redirect('/admin')
  })
    
  })
// Delete Category
router.get('/delete-category',(req,res)=>{
  categoryHelpers.deleteCategoy(req.query.id).then(()=>{
    res.redirect('/admin')
  })
})

// View Users

router.get('/view-users',(req,res)=>{
  userHelpers.getAllUsers().then((usersData)=>{
    res.render('admin/view-users',{admin:true,usersData})
  })
})

// Category
router.get('/category',async(req,res)=>{
    let category=await categoryHelpers.getCategoryDetails(req.query.id)
    let qb=category.questionBank
    let questionBank=await categoryHelpers.getQuestionBankQuestions(req.query.id)
    res.render('admin/category',{admin:true,category,questionBank})
    
  
})

// Add Question
router.get('/add-question',(req,res)=>{
  res.render('admin/add-question',{admin:true,catId:req.query.id})
})

router.post('/add-question',(req,res)=>{
  questionHelpers.addQuestionToDoc(req.body).then((data)=>{
    let questionId=data
    categoryHelpers.addQuestion(req.query.id,questionId).then(()=>{
      res.redirect('/admin')
    })

  })
})

// Edit Question
router.get('/edit-question',async(req,res)=>{
  let data=await questionHelpers.getQuesDet(req.query.id)
  res.render('admin/edit-question',{admin:true,data})
})
router.post('/edit-question',(req,res)=>{
  questionHelpers.editQuestion(req.body).then(()=>{
  res.redirect('/admin')
  })
})

// Delete Question

router.get('/delete-question',(req,res, next)=>{
  let quesId= req.query.quesId
  let catId=req.query.catId
  categoryHelpers.deleteQuestionFromBank(catId,quesId).then(()=>{
    next()
  })
    questionHelpers.deleteQuestion(quesId).then(()=>{
      res.redirect('/admin')
    })

});
module.exports = router;
