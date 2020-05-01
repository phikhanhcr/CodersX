var db = require('../db');
var Session = require('../models/session.model');
module.exports = async (req, res, next) => {
  var sessionId = req.signedCookies.sessionId;
  if (!sessionId) {
    res.redirect('/books');
    return;
  }
  // var allCart = db.get('session').find({ id: sessionId }).value().cart;
  var allCart = await Session.findById(sessionId);
  // var total = allCart.cart.reduce((a , b) => {
  //   return a.amount + b.amount
  // } , 0);
  var arrayCart = allCart.cart;
  var sum = 0;
  arrayCart.forEach(ele => {
    sum += ele.amount;
  })
  //console.log(sum);
  if(sum == 0 ) {
    res.locals.totalAmount = "";
  } else {
    res.locals.totalAmount = sum;
  }
  next();
}

