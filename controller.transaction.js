var db = require("./db.js");
var pug = require("pug");
var shortId = require("shortid");
var removeAccents = require("./removeAccents.js");
var Transaction = require('./models/trasaction.model');
var User = require('./models/user.model');
var Book = require('./models/book.model');
module.exports.index = async (req, res) => {
  //var transaction = db.get('transaction').value();
  var transaction = await Transaction.find(); // []
  // 1 . find userId in transaction
  var usersId = transaction.map(ele => {    // []  array Id of db.get('transaction');
    return ele.userId;
  })
  // 2 . get all object in user
  var arrayUser = await User.find();
  var userName = [];
  // filter based on id
  for(var i = 0 ; i < usersId.length ; i++ ) {
    arrayUser.filter(ele => {
      if(ele._id == usersId[i]) {
        userName.push(ele.name);
      }
    })
  }
  
  var booksId = transaction.map(ele => {    // []  array Id of db.get('transaction');
    return ele.bookId;
  })
  var arrayBook =  await Book.find(); // []
  var bookName = [];
  for(var i = 0 ; i < booksId.length ; i++ ) {
    arrayBook.filter(ele => {
      if(ele.id == booksId[i]) {
        bookName.push(ele.title)
      }
    })
  }
  var arr = [];
  // nhóm từng giá trị lại thành 1 object để chia bảng 
  for(var i = 0 ; i < transaction.length ; i++ ) {
    arr[i] = {
      name : bookName[i], 
      users : userName[i],
      per : transaction[i] // isComplete and Circumstance
    }
  }
  //console.log(arr);
  res.render('transaction' , {
    "books" : bookName, 
    "users" : userName,
    'per' : transaction,
    "arr" : arr,
    "stt" : 1
  });
}
module.exports.create = async (req, res) => {
  var users = await User.find();
  var books = await Book.find();
  var arrayUser = users.map(ele => {
    return ele.name;
  })
  var arrayBook = books.map(ele => {
    return ele.title;
  })
  res.render('transactionCreate' , {
    "users" : arrayUser ,
    "books" : arrayBook 
  });
}

module.exports.createPost = async (req, res) => {
  var user = req.body.user;
  var book = req.body.book;
  // var userId = db.get('users').find({name : user}).get('id').value();
  // var bookId = db.get('books').find({title : book}).get('id').value();
  var userId = await User.find({name : user});
  var bookId = await Book.find({title : book});
  var check = false;
  var value = {
    bookId : bookId[0]._id , 
    userId : userId[0]._id ,  
    isComplete : check
  }
  console.log(value);
  // db.get('transaction').push(value).write();
  await Transaction.insertMany(value);
  res.redirect('/transaction');
}

module.exports.remove = async (req, res) => {
  var id = req.params.id;
  await Transaction.findByIdAndRemove(id);
  res.redirect('/transaction')
}

module.exports.complete = async (req, res) => {
  var id = req.params.id;
  var check = true;
  // db.get('transaction')
  //   .find({id : id})
  //   .assign({isComplete : true})
  //   .value();
  await Transaction.findByIdAndUpdate(id , {isComplete : check})
  res.redirect('/transaction');
}