var mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name : { type: String, trim: true },
  sdt : { type: Number, trim: true },
  email :  { type: String, trim: true },
  pass :  { type: String, trim: true },
  isAdmin : {type : Boolean , trim : true , default : false},
  wrongLoginCount : {type : Number , default : 0 },
  avatar : { type: String, trim: true , default : "http://res.cloudinary.com/pklevi/image/upload/v1588299846/w9rdhnyjvrppfepvolv2.png"}
})

var User = mongoose.model('User' , userSchema , 'users');
module.exports = User;