const mongoose = require('mongoose') ;

mongoose.pluralize(null);

const Schema = mongoose.Schema ;

const userSchema = new Schema({

username : String,
googleid : String,
imagepath : String
});

const addUser = mongoose.model('users',userSchema);

module.exports = addUser ;
