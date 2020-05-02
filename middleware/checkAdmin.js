var db = require('../db');
var User = require('../models/user.model');
module.exports.checkAdmin = async (req, res, next ) => {
  if(!req.signedCookies.userId) {
    res.redirect('login');
    return;
  }

  var user = await User.find({_id : req.signedCookies.userId})
  if(!user.length) {
    res.redirect('login');
    return;
  }
  if(user[0].isAdmin !== true ) {
    res.redirect('/transaction');
    return;
  }
  next();
}