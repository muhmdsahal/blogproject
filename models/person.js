var mongoose = require('mongoose');

var personSchema = mongoose.Schema({
    name:String,
    email:String,
    password: String,
    status:Number,
    isAdmin:String
    
 });
 var person = mongoose.model("person", personSchema);

 

 module.exports = person;