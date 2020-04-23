const express = require('express');
var router = express.Router();
var db = require("./db.js");
var pug = require("pug");
var shortId = require("shortid");
var removeAccents = require("./removeAccents.js");

router.get('/' , (req, res) => {
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
      if(ele.id = usersId[i]) {
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
      if(ele.id = booksId[i]) {
        bookName.push(ele.title)
      }
    })
  }
  res.render('transaction' , {
    "books" : bookName, 
    "users" : userName
  });
})

module.exports = router;