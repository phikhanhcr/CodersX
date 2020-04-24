var db = require('./db');

module.exports.login = (req, res, next) => {
  res.render('login');
}

module.exports.loginPost = (req, res, next) => {
  var email = req.body.email;
  var user = db.get('users').find({ email : email }).value();
  if(!user) {
    res.render('login' , {
      "errors" : ["Account doesn't not exist!"]
    })
    return;
  }
  var pass = req.body.pass;
  if(user.pass != pass) {
    res.render('login' , {
      "errors" : ["Wrong password, try again!"],
      "values" : req.body
    })
    return;
  }
  res.cookie('userId' , user.id , { signed : true });

  res.redirect('/users');
}