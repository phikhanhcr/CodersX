var db = require('./db');
var shortId = require('shortid');
var Session = require('./models/session.model');
var Book = require('./models/book.model');
var User = require('./models/user.model');
var Transaction = require('./models/trasaction.model')
module.exports.addCart = async (req, res, next) => {
  var bookId = req.params.id;
  var pageCurrent = req.query.page;
  var sessionId = req.signedCookies.sessionId;
  if (!sessionId) {
    res.redirect('/books');
    return;
  }
  // add to cart
  // 1 . first book
  var book = await Session.findById(sessionId); // []
  var cartLength = book.cart.length;
  // console.log(cartLength);
  var count;
  // check xem co cai book nao chua , chua co thi set count = 0
  if (book.cart[cartLength] == undefined) {
    count = 0;
  }

  // note : 
  console.log("cartLength : " + cartLength);
  if (cartLength == 0) {
    book.cart[0] = {
      name: bookId,
      amount: count + 1
    }
  } else {
    var test = false;
    for (var i = 0; i < cartLength; i++) {
      if (book.cart[i].name == bookId) {
        test = true;
        count = book.cart[i].amount;
        book.cart[i].amount = count + 1;
        break;
      }
    }
    if(test != true) {
      book.cart[cartLength] = {
        name : bookId , 
        amount : count + 1
      }
    }
  }

  book.save();



  // var count = db.get('session')
  //   .find({ id: sessionId })
  //   .get('cart.' + bookId, 0)
  //   .value()
  // db.get('session')
  //   .find({ id: sessionId })
  //   .set('cart.' + bookId, count + 1)
  //   .write();


  res.redirect('/books?page=' + pageCurrent);
}
module.exports.viewCart = async (req, res, next) => {
  var sessionId = req.signedCookies.sessionId;
  if (!sessionId) {
    res.redirect('/books');
    return;
  }
  var allBooks = await Book.find();
  // var allCart = db.get('session').find({ id: sessionId }).value().cart;
  var bookCart = await Session.findById(sessionId);
  var allCart = bookCart.cart;
  console.log(allCart);
  var booksHire = [];
  
  if (allCart) {
    var informationBooksCart = [];
    for (var i = 0; i < allCart.length; i++) {
      allBooks.filter(ele => {
        if (ele._id == allCart[i].name) {
          informationBooksCart.push(ele);
        }
      })
    }
    // number of book you want to borrow
    // var allAmount = Object.values(allCart);
    var allAmount = allCart.map(ele => {
      return ele.amount;
    })
    for (var i = 0; i < allAmount.length; i++) {
      booksHire[i] = {
        title: informationBooksCart[i].title,
        price: informationBooksCart[i].price,
        amount: allAmount[i],
        money: informationBooksCart[i].price * allAmount[i]
      }
    }
  }
  console.log(booksHire);
  // information all books
  // amount 
  res.render('viewAllCart', {
    "books": booksHire
  })

}

module.exports.hireBooks = async (req, res, next) => {
  var sessionId = req.signedCookies.sessionId;
  if (!sessionId) {
    res.redirect('/books');
    return;
  }
  if (!req.signedCookies.userId) {
    res.redirect('/login');
    return;
  }
  // 1 . find user
  var userId = req.signedCookies.userId;
  // var userName = db.get('users').find({ id: userId }).value().name;
  var user = await User.find({_id : userId});
  var userName = user[0].name;
  // 2 . find all id books they wanna hire
  // var allCart = db.get('session').find({ id: sessionId }).value().cart;
  var bookCart = await Session.findById({_id : sessionId});
  var allCart = bookCart.cart;
  // var IdBooks = Object.keys(allCart);
  var IdBooks = allCart.map(ele => {
    return ele.name;
  })
  var newUserHire = [];
  // 3 . insert
  //var id = shortId.generate();
  for (var i = 0; i < IdBooks.length; i++) {
    newUserHire[i] = {
      bookId: IdBooks[i],
      userId: userId,
      isComplete: false
    }
    // db.get('transaction')
    //   .push(newUserHire[i])
    //   .write();
    await Transaction.insertMany(newUserHire[i]);
  }

  // 4 . after hiring books, all data about books which are hired will be removed
  
  // db.get('session')
  //   .find({ id: sessionId })
  //   .set('cart', {})
  //   .write()
  // console.log(newUserHire);
  await Session.findByIdAndUpdate(sessionId , {cart : []})
  res.redirect('/transaction');
}