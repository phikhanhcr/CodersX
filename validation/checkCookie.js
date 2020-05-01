var db = require('../db');
var User = require('../models/user.model');
module.exports.checkCookie = async (req, res, next ) => {
  if(!req.signedCookies.userId) {
    res.redirect('login');
    return;
  }

  // var user = db.get('users').find({id : req.signedCookies.userId}).value();
  var user = await User.find({_id : req.signedCookies.userId})
  if(!user) {
    res.redirect('login');
    return;
  }
  var checkAdmin = 'block';
  if(user[0].isAdmin !== true ) {
    checkAdmin = 'none';
  }
  // if you are not admin , you will not see /user page and /books page and vice versa(và ngược lại) 
  res.locals.checkAdmin = checkAdmin;
  res.locals.User = user[0].name;
  next();
}