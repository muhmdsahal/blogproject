var express = require('express');
var app = express();
var ejs = require('ejs');
var session = require('express-session');
var cookieParser = require("cookie-parser");
var bodyparser = require('body-parser');
var url = require('url');


app.set('view engine','ejs');
app.set('views','./views');

app.use(express.static('css'));
app.use(express.static('imgs'));

app.use(bodyparser.urlencoded({extended:true}));
app.use(session({secret: "Your secret key"}));
app.use(cookieParser());



var module = require('./projectmodules');
app.use('/',module);


app.listen(3000,function(req,res){
    console.log('server started')
})