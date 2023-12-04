var express=require('express');
var router=express.Router();
var person = require('./models/person');
var manager= require('./models/manager');
var art= require('./models/blogart');


router.use(function(req, res, next) {   res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');   next(); });
function checkSignIn(req, res, next){
   if(req.session.admin){
     next();     //If session exists, proceed to page
   } else {
     res.redirect('/interface')
      console.log(req.session.person);
      next(err);  //Error, trying to access unauthorized page!
   }
}

 router.get('/admindash',checkSignIn,function(req,res){
   res.render('admindash')
 });

 router.get('/userdetails',checkSignIn,function(req,res){ //admin dashboard get
   person.find(function(err, response){
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
      } else {
       const message = req.query.msg
          res.render('userdetails', {
              message: "",
              data:response
              
          });
      }
    });
 });
 router.get('/managerdash',checkSignIn,function(req,res){ //admin dashboard get
   manager.find(function(err, response){
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
      } else {
       const message = req.query.msg
          res.render('managerdash', {
              message: "",
              data:response
              
          });
      }
    });
 });
 
  router.post('/addmanager',function(req,res){
      var managerInfo = req.body
      if(!managerInfo.managername || !managerInfo.manageremail || !managerInfo.managerpassword){
         res.render('addmanager',{
            message:"please enter the fields"
         })
      }else{
         var newmanager = new manager({
            name:managerInfo.managername,
            email:managerInfo.manageremail,
            password:managerInfo.managerpassword,
            status:1,
            isAdmin:'Manager'
         })
         newmanager.save(function(err, manager){
            if(err){
            res.render('addmanager', {message: "Database error", type: "error"});
            }
          
           
   
            res.redirect('/managerdash/?msg=added');
            
          });
      }
      
  });
  router.post('/managerdash/addmanager',function(req,res){
   var managerInfo = req.body
   if(!managerInfo.managername || !managerInfo.manageremail || !managerInfo.managerpassword){
      res.render('addmanager',{
         message:"please enter the fields"
      })
   }else{
      var newmanager = new manager({
         name:managerInfo.managername,
         email:managerInfo.manageremail,
         password:managerInfo.managerpassword,
         status:1,
         isAdmin:'Manager'
      })
      newmanager.save(function(err, manager){
         if(err){
         res.render('addmanager', {message: "Database error", type: "error"});
         }
       
        

         res.redirect('/managerdash/?msg=added');
         
       });
   }
   
});

router.get('/addmanager',checkSignIn,function(req,res){
   res.render('manageradd')
 })

 router.get('/managerdash/addmanager',checkSignIn,function(req,res){
   res.render('manageradd')
 })

  router.get('/managerarticle',checkSignIn,function(req,res){
   res.render('managerarticle')
  });
router.get('/reject_manager/:id',checkSignIn,function(req, res){
   console.log(req.params.id)
   manager.findByIdAndUpdate({_id:req.params.id},{status:0},(err,response)=>{
      if(err){
         console.log('error')
      }else{
          res.redirect('/managerdash/?msg=rejected')
   }
  
   });
         });

router.get('/approve_manager/:id',checkSignIn,function(req, res){
   console.log(req.params.id)
   manager.findByIdAndUpdate({_id:req.params.id},{status:1},(err,response)=>{
      if(err){
         console.log('error')
      }else{
          res.redirect('/managerdash/?msg=approved')
   }
  
   });
          });


  router.get('/reject/:id',checkSignIn,function(req, res){
    console.log(req.params.id)
    person.findByIdAndUpdate({_id:req.params.id},{status:0},(err,response)=>{
       if(err){
          console.log('error')
       }else{
           res.redirect('/userdetails/?msg=rejected')
    }
   
    });
          });
 router.get('/approve/:id',checkSignIn,function(req, res){
  console.log(req.params.id)
  person.findByIdAndUpdate({_id:req.params.id},{status:1},(err,response)=>{
     if(err){
        console.log('error')
     }else{
         res.redirect('/userdetails/?msg=approved')
  }
 
  });
         });
 router.get('/viewprofile/:id',checkSignIn,function(req, res){
  person.findById({_id:req.params.id},(err,user)=>{
     if(err){
        console.log('error')
     }else{
         res.render('userprofile',{user})
  }
 
  });
         });

router.get('/managerdash/logout',checkSignIn, function (req, res, next) {
	if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.redirect('/userlogin');
    	}
    });
}
});
router.get('/managetopic',checkSignIn,function(req,res){ //admin dashboard get
   art.find(function(err, response){
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
      } else {
       const message = req.query.msg
          res.render('managetopics', {
              
              data:response
              
          });
      }
    });
 });
 router.get('/approve_topics/:id',checkSignIn,function(req, res){
   console.log(req.params.id)
   art.findByIdAndUpdate({_id:req.params.id},{status:1},(err,response)=>{
      if(err){
         console.log('error')
      }else{
          res.redirect('/managetopic/?msg=approved')
   }
  
   });
          });
 router.get('/reject_topics/:id',checkSignIn,function(req, res){
   console.log(req.params.id)
   art.findByIdAndUpdate({_id:req.params.id},{status:0},(err,response)=>{
      if(err){
         console.log('error')
      }else{
          res.redirect('/managetopic/?msg=approved')
   }
  
   });
          });

  module.exports = router;