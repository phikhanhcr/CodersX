
var Shop = require('../models/shop.model');
module.exports.checkHasShop = async (req, res, next) => {
  if (!req.signedCookies.userId) {
    res.redirect('login');
    return;
  }
  var hasShop = await Shop.find({ _id: req.signedCookies.userId })
  if (hasShop.length) {
    res.redirect('/books');
    return;
  }
  next();
}