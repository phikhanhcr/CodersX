var db = require("./db.js");
var pug = require("pug");
var shortId = require("shortid");
var removeAccents = require("./removeAccents.js");

module.exports.index = (req, res) => {
  var transaction = db.get('transaction').value();
  
  // 1 . find userId in transaction
  var usersId = transaction.map(ele => {    // []  array Id of db.get('transaction');
    return ele.userId;
  })
  // 2 . get all object in user
  var arrayUser = db.get('users').value();  // []
  var userName = [];
  // filter based on id
  for(var i = 0 ; i < usersId.length ; i++ ) {
    arrayUser.filter(ele => {
      if(ele.id == usersId[i]) {
        userName.push(ele.name);
      }
    })
  }
  
  var booksId = transaction.map(ele => {    // []  array Id of db.get('transaction');
    return ele.bookId;
  })
  var arrayBook = db.get('books').value();  // []
  var bookName = [];
  for(var i = 0 ; i < booksId.length ; i++ ) {
    arrayBook.filter(ele => {
      if(ele.id == booksId[i]) {
        bookName.push(ele.title)
      }
    })
  }
  res.render('transaction' , {
    "books" : bookName, 
    "users" : userName,
    'per' : transaction 
  });
}
module.exports.create = (req, res) => {
  var users = db.get('users').map('name').value();
  var books = db.get('books').map('title').value();
  res.render('transactionCreate' , {
    "users" : users ,
    "books" : books 
  });
}

module.exports.createPost = (req, res) => {
  var user = req.body.user;
  var book = req.body.book;
  var userId = db.get('users').find({name : user}).get('id').value();
  var bookId = db.get('books').find({title : book}).get('id').value();
  var id = shortId.generate();
  var check = false;
  var value = {
    bookId : bookId , 
    userId : userId , 
    id : id, 
    isComplete : check
  }
  db.get('transaction').push(value).write();
  res.redirect('/transaction');
}

module.exports.remove =  (req, res) => {
  var id = req.params.id;
  db.get('transaction')
    .remove({id : id})
    .write();
  res.redirect('/transaction')
}

module.exports.complete = (req, res) => {
  var id = req.params.id;
  var check = true;
  db.get('transaction')
    .find({id : id})
    .assign({isComplete : true})
    .value();
  console.log(db.get('transaction').map('isComplete').value());
  res.redirect('/transaction');
}