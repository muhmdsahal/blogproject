var express=require('express');
var router=express.Router();

var person = require('./models/person');
var art = require('./models/blogart');
var comment = require('./models/comment');

router.use(function(req, res, next) {   res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');   next(); });
function checkSignIn(req, res, next){
   if(req.session.person){
     next();     //If session exists, proceed to page
   } else {
     res.redirect('/interface')
      console.log(req.session.person);
      next(err);  //Error, trying to access unauthorized page!
   }
}

router.get('/article',checkSignIn,function(req,res){ //admin dashboard get
    
    art.find(function(err, response){
       if (err) {
           console.error(err);
           res.status(500).send('Internal Server Error');
       } else {
        const message = req.query.msg
           res.render('article', {
               data:response
               
           });
       }
     });
  
});

router.post('/addarticle',function(req,res){
   
    articleInfo=req.body
       if(!articleInfo.topic || !articleInfo.content){
        res.render('article',{message:"fill"})
       }else{
        var newart = new art({
            name:req.session.person.name,
            title:articleInfo.title,
            topic:articleInfo.topic,
            content:articleInfo.content,
            status:0,
            date:Date.now()
        })
        newart.save(function(err, art){
            if(err){
            res.render('signup', {message: "Database error", type: "error"});
            }else{
                res.redirect('/article/?msg=added')
            }
   
            
          });

       }
    
});

router.post('/addcomment/:id',function(req,res){
   
    commentInfo=req.body
       if(!commentInfo.content ){
        res.render('addcomment',{message:"fill"})
       }else{
        var newcomment = new comment({
            content:commentInfo.content,
            date:Date.now(),
            id:req.params.id
        })
        newcomment.save(function(err, comment){
            if(err){
            res.render('addcomment', {message: "Database error", type: "error"});
            }else{
                res.redirect('/addcomment/'+req.params.id+'/?msg=added')
            }
   
            
          });

       }
    
});
router.get('/addcomment/:id',checkSignIn,function(req,res){ //admin dashboard get
    comment.find(function(err, response){
       if (err) {
           console.error(err);
           res.status(500).send('Internal Server Error');
       } else {
        const message = req.query.msg
           res.render('addcomment', {
            message:"",
               data:response,
               req:req
            
               
           });
       }
     });
  })

router.get('/addarticle',checkSignIn,function(req,res){
    res.render('addarticle')
})


router.get('/article/addarticle',checkSignIn,function(req,res){
    res.render('addarticle')
});

router.get('/delete_history/:id', function(req, res){
    art.findByIdAndRemove(req.params.id, function(err, response){
       if(err) res.json({message: "Error in deleting record id " + req.params.id});
       else
       console.log('deleted')
       res.redirect('/history/?msg=deleted');
 });
})
router.get('/delete_tech/:id', function(req, res){
    art.findByIdAndRemove(req.params.id, function(err, response){
       if(err) res.json({message: "Error in deleting record id " + req.params.id});
       else
       console.log('deleted')
       res.redirect('/tech/?msg=deleted');
 });
})
router.get('/delete_sports/:id', function(req, res){
    art.findByIdAndRemove(req.params.id, function(err, response){
       if(err) res.json({message: "Error in deleting record id " + req.params.id});
       else
       console.log('deleted')
       res.redirect('/sports/?msg=deleted');
 });
})
router.get('/delete_movie/:id', function(req, res){
    art.findByIdAndRemove(req.params.id, function(err, response){
       if(err) res.json({message: "Error in deleting record id " + req.params.id});
       else
       console.log('deleted')
       res.redirect('/movies/?msg=deleted');
 });
})



module.exports = router;