var mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
  title : { type: String, trim: true },
  price: { type: Number, trim: true },
  desc :  { type: String, trim: true }
})
var Book = mongoose.model('Book' , bookSchema , 'books');
module.exports = Book;