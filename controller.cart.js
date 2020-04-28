var db = require('./db');
var shortId = require('shortid');
module.exports.addCart = (req , res, next ) => {
  var bookId = req.params.id;
  var pageCurrent = req.query.page;
  var sessionId = req.signedCookies.sessionId;  
  if(!sessionId) {
    res.redirect('/books');
    return;
  }
  var count = db.get('session')
                .find({id : sessionId})
                .get('cart.' + bookId , 0)
                .value()
  db.get('session')
    .find({id : sessionId})
    .set('cart.' + bookId , count + 1)
    .write();
  

  res.redirect('/books?page=' + pageCurrent);
}
module.exports.viewCart = (req, res, next ) => {
  var sessionId = req.signedCookies.sessionId;
  if(!sessionId) {
    res.redirect('/books');
    return;
  }
  var allCart = db.get('session').find({id : sessionId}).value().cart;
  var allBooks = db.get('books').value();
  var IdBooks = Object.keys(allCart);
  var informationBooksCart = [];
  for(var i = 0 ; i < IdBooks.length ; i++ ){
    allBooks.filter(ele => {
      if(ele.id == IdBooks[i]) {
        informationBooksCart.push(ele);
      }
    })
  }
  var allAmount = Object.values(allCart);
  console.log(allAmount);
  var booksHire = []; 
  for(var i = 0 ; i < allAmount.length ; i++ ){
    booksHire[i] = {
      title : informationBooksCart[i].title,
      price : informationBooksCart[i].price,
      amount : allAmount[i],
      money : informationBooksCart[i].price * allAmount[i]
    }
  }
  // information all books
  // amount 
  res.render('viewAllCart', {
    "books" : booksHire 
  })
  
}
              
module.exports.hireBooks = (req, res, next ) => {
  var sessionId = req.signedCookies.sessionId;
  if(!sessionId) {
    res.redirect('/books');
    return;
  }
  if(!req.signedCookies.userId) {
    res.redirect('/login');
    return;
  }
  // 1 . find user
  var userId = req.signedCookies.userId;
  var userName = db.get('users').find({id : userId}).value().name;
  console.log(userName);
  // find all id books they wanna hire
  var allCart = db.get('session').find({id : sessionId}).value().cart;
  var IdBooks = Object.keys(allCart);
  
  var newUserHire = [];
  //var id = shortId.generate();
  for(var i = 0 ; i < IdBooks.length ; i++ ) {
    newUserHire[i] = {
      bookId : IdBooks[i],
      userId : userId,
      id : shortId.generate() ,
      isComplete : false
    }
    db.get('transaction')
      .push(newUserHire[i])
      .write();
  }

  // after hiring books, all data about books which are hired will be removed
  db.get('session')
    .find({ id : sessionId})
    .set('cart', {})
    .write()
  console.log(newUserHire);
  res.redirect('/transaction');
}