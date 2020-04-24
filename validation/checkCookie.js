var db = require('../db');

module.exports.checkCookie = (req, res, next ) => {
  if(!req.signedCookies.userId) {
    res.redirect('login');
    return;
  }

  var user = db.get('users').find({id : req.signedCookies.userId}).value();
  if(!user) {
    res.redirect('login');
    return;
  }
  var checkAdmin = 'block';
  if(user.isAdmin !== true ) {
    checkAdmin = 'none';
  }
  // if you are not admin , you will not see /user page and /books page and vice versa(và ngược lại) 
  res.locals.checkAdmin = checkAdmin;
  res.locals.User = user.name;
  next();
}