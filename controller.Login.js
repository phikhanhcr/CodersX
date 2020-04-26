var db = require('./db');
var md5 = require('md5');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.login = (req, res, next) => {
  res.render('login');
}

module.exports.loginPost = async (req, res, next) => {
  var email = req.body.email;
  var user = db.get('users').find({ email : email }).value();
  if(!user) {
    res.render('login' , {
      "errors" : ["Account doesn't not exist!"]
    })
    return;
  }
  var pass = req.body.pass;
  if(user.wrongLoginCount  >= 3 ) {
    res.render('login' , {
      "errors" : ["Your account has been locked! Try after 100 years"],
      "values" : req.body
    })
    return;
  }
  // 1 . convert req.body.pass => bcrypt 
  const hash = await bcrypt.hashSync(pass , saltRounds);
  console.log(hash);
  // 2 . compare current user's password and hash
  const check = await bcrypt.compareSync(process.env.PASSWORD , hash);
  console.log(check);
  
  if(check != true) {
    // update each time wrong password , count++ , >= 3 => lock
    db.get('users')
      .find({email : user.email})
      .assign({wrongLoginCount : user.wrongLoginCount + 1})
      .write()
    res.render('login' , {
      "errors" : ["Wrong password, try again!"],
      "values" : req.body
    })
    return;
  }
  
  res.cookie('userId' , user.id , { signed : true });
  user.wrongLoginCount = 0;
  res.redirect('/transaction');
}