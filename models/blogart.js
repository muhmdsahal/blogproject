var mongoose = require('mongoose');

var artSchema = mongoose.Schema({
    name:String,
    title:String,
    topic:String,
    content:String,
    status:Number,
    date:Date
})
var art = mongoose.model("art",artSchema);

module.exports = art;