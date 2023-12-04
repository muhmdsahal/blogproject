var express=require('express');
var router=express.Router();
var person = require('./models/person');


router.use(function(req, res, next) {   res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');   next(); });

   



router.post('/login', function (req, res, next) {
	

	if(!req.body.useremail || !req.body.userpassword){
		res.render('userlogin',{message:"Please fill the fields"})
	}
	
	person.findOne({email:req.body.useremail},function(err,data){
		if(data){
			
			if(data.password==req.body.userpassword){
				if(data.isAdmin=='Admin'){
					req.session.admin = data;
					res.redirect('admindash')
				}else if(data.isAdmin=='Basic')
				{
				 if(data.status==1){
					req.session.person = data;
					res.redirect('article')
				}else{
					res.render('userlogin',{
						message:'Unable to log in.Please log in using another id'
				})
				}
			}
			else{
				res.render('userlogin',{
					message:"unable to log in"
				})
			} 

		}else{
			res.render('userlogin',{message:"invalid password"});
		}
		
	}
else{
	res.render('userlogin',{message:'invalid email'})
}})
	
});
router.get('/logout', function (req, res, next) {
	if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.render('signup',{message:"you logged out"});
    	}
    });
}
});




module.exports = router;