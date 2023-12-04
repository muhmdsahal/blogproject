var express=require('express');
var router=express.Router();
var manager= require('./models/manager');
var art= require('./models/blogart')



router.use(function(req, res, next) {   res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');   next(); });
function checkSignIn(req, res, next){
   if(req.session.manager){
     next();     //If session exists, proceed to page
   } else {
     res.redirect('/signup')
      console.log(req.session.person);
      next(err);  //Error, trying to access unauthorized page!
   }
}


  router.get('/managerlogin',function(req,res){
   res.render('managerlogin',{message:""})
  });

router.post('/managerlogin', function (req, res) {
	

	if(!req.body.manageremail|| !req.body.managerpassword){
		res.render('managerlogin',{message:"Please fill the fields"})
	}
	
	manager.findOne({email:req.body.manageremail},function(err,data){
		if(data){
         req.session.manager = data
			
			if(data.password==req.body.managerpassword){
				if(data.name=='Sports'){
					res.redirect('/sports?msg=sports')
				}else if(data.name=='History')
				{
               res.redirect('/history?msg=history')
			   }else if(data.name=='Technology'){
               res.redirect('/tech?msg=tech')
            }else if(data.name=='Movies'){
               res.redirect('/movies?msg=movie')
            }
			
		}else{
			res.render('managerlogin',{message:"invalid password"});
		}
		
	}
else{
	res.render('managerlogin',{message:'invalid email'})
}})
	
});





  router.get('/sports',checkSignIn,function(req,res){ //admin dashboard get
    
   art.find(function(err, response){
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
      } else {
       const message = req.query.msg
          res.render('sports', {
              
              data:response
              
          });
      }
    });
 
});
router.get('/history',checkSignIn,function(req,res){ //admin dashboard get
    
   art.find(function(err, response){
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
      } else {
       const message = req.query.msg
          res.render('history', {
              
              data:response
              
          });
      }
    });
 
});
router.get('/movies',checkSignIn,function(req,res){ //admin dashboard get
    
   art.find(function(err, response){
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
      } else {
       const message = req.query.msg
          res.render('movies', {
              
              data:response
              
          });
      }
    });
 
});
router.get('/tech',checkSignIn,function(req,res){ //admin dashboard get
    
   art.find(function(err, response){
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
      } else {
       const message = req.query.msg
          res.render('tech', {
              
              data:response
              
          });
      }
    });
 
});
router.get('/delete_sports/:id',checkSignIn,function(req, res){
   console.log(req.params.id)
   art.findByIdAndUpdate({_id:req.params.id},{status:0},(err,response)=>{
      if(err){
         console.log('error')
      }else{
          res.redirect('/sports/?msg=approved')
   }
  
   });
          });
router.get('/accept_sports/:id',checkSignIn,function(req, res){
   console.log(req.params.id)
   art.findByIdAndUpdate({_id:req.params.id},{status:1},(err,response)=>{
      if(err){
         console.log('error')
      }else{
          res.redirect('/sports/?msg=approved')
   }
  
   });
          });
  
  
  module.exports = router;