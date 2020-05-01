var mongoose = require('mongoose');
var transactionSchema = new mongoose.Schema({
  bookId : {type : String} ,
  userId : {type : String} ,
  isComplete : {type : Boolean , default: false}
})
var Transaction = mongoose.model('Transaction' , transactionSchema , 'transaction');
module.exports = Transaction;