var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
   content:String,
   id:String,
    date:Date
})
var comment = mongoose.model("comment",commentSchema);

module.exports = comment;