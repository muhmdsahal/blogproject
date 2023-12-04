var express=require('express');
var router=express.Router();
var person = require('./models/person');

router.get('/signup', function(req, res){ //signup get
    res.render('signup',{
        message:""
    });
 });

 router.use(function(req, res, next) {   res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');   next(); });
function checkSignIn(req, res, next){
   if(req.session.person){
     next();     //If session exists, proceed to page
   } else {
      var err = new Error("Not logged in!");
      console.log(req.session.person);
      next(err);  //Error, trying to access unauthorized page!
   }
}
 
 

router.post('/signup',function(req, res){
    var personInfo = req.body; 
    
    if( !personInfo.email || !personInfo.password){
     res.render('signup', {
        message: "please enter mandatory fields", type: "error"});
    }
    person.findOne({ email: personInfo.email}, function (err, existingUser) { //login user
       if (err) {
           console.error(err);
           return res.render('signup');
       }
 
       if (existingUser) {
           return res.render('signup', {
               message: "User with this EMAIL already exists. Please choose another EMAIL.", type: "error"
           });
       } 
    else {
       var newperson = new person({
          name: personInfo.name,
          email: personInfo.email,
          password: personInfo.password,
          status:1,
          isAdmin:'Basic'
       });
       
       
         
       newperson.save(function(err, person){
          if(err){
          res.render('signup', {message: "Database error", type: "error"});
          }
        
          req.session.person= newperson;
 
          res.redirect('/article/?msg=added');
          
        });
     }
       });
    });

    router.use(express.static('css'));
router.use(express.static('imgs'));
  
    module.exports = router;