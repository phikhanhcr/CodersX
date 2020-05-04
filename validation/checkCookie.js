var Shop = require('../models/shop.model');
var User = require('../models/user.model');
module.exports.checkCookie = async (req, res, next) => {
  if (!req.signedCookies.userId) {
    res.redirect('login');
    return;
  }
  var user = await User.find({ _id: req.signedCookies.userId })
  if (!user) {
    res.redirect('login');
    return;
  }
  var checkAdmin = 'block';
  if (user[0].isAdmin !== true) {
    checkAdmin = 'none';
  }

  // Check Has User had Shop yet ? 
  var checkHasShop = "none";
  var check2 = 'block';
  var hasShop = await Shop.find({ _id: req.signedCookies.userId })
  if (!hasShop.length) {
    checkHasShop = 'block';
    check2 = 'none';
  }
  res.locals.displayNewShop = checkHasShop;
  res.locals.check2 = check2;
  // if you are not admin , you will not see /user page and /books page and vice versa(và ngược lại) 
  res.locals.checkAdmin = checkAdmin;
  res.locals.User = user[0].name;
  res.locals.IdUser = user[0]._id;
  next();
}