var mongoose = require('mongoose');

var managerSchema = mongoose.Schema({
    name:String,
    email:String,
    password: String,
    status:Number,
    isAdmin:String
    
 });
 var manager = mongoose.model("manager", managerSchema);

 

 module.exports = manager;