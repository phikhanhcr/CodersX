var mongoose = require('mongoose');
const sessionSchema = new mongoose.Schema({
  _id : {type : String , trim : true , required : true},
  cart : [{
    name : {type : String , trim : true , default : '' },
    amount : {type : Number , default: 0}
  }]
})
var Session = mongoose.model('Session' , sessionSchema , 'session');
module.exports = Session;