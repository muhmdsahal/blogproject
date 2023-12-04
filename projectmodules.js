var express=require('express');
var router=express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/myblog');

var person = require('./models/person');







var user = require('./user')
router.use('/',user);

var adminlog = require('./adminlog')
router.use('/',adminlog);

var managerlog = require('./managerlog')
router.use('/',managerlog);

var userlogin = require('./userlogin')
router.use('/',userlogin);

var article = require('./article')
router.use('/',article);

router.use(express.static('css'));
router.use(express.static('imgs'));





router.get('/', function(req, res){                   //interface..........
    res.render('interface',{
      message:""
    });
 });
 router.get('/interface',function(req,res){          //interface get.......
   res.render('interface')
 });
 


router.get('/login',function(req,res){
   res.render('userlogin',{
      message:""
   })
})


 module.exports = router;