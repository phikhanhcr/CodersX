var db = require('../db');
module.exports.checkAdmin = (req, res, next ) => {
  if(!req.signedCookies.userId) {
    res.redirect('login');
    return;
  }

  var user = db.get('users').find({id : req.signedCookies.userId}).value();
  if(!user) {
    res.redirect('login');
    return;
  }
  if(user.isAdmin !== true ) {
    res.redirect('/transaction');
    return;
  }
  next();
}