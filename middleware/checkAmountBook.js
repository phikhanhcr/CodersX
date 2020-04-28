var db = require('../db');
module.exports = (req, res, next) => {
  var sessionId = req.signedCookies.sessionId;
  if (!sessionId) {
    res.redirect('/books');
    return;
  }
  var allCart = db.get('session').find({ id: sessionId }).value().cart;
  totalAmount = "";
  if (allCart) {
    var arrAmount = Object.values(allCart);
    totalAmount = arrAmount.reduce((a, b) => {
      return a + b;
    }, 0);
    totalAmount = totalAmount;
  }
  res.locals.totalAmount = totalAmount;
  next();
}

