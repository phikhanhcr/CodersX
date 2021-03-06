var db = require('./db');
var md5 = require('md5');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const sgMail = require('@sendgrid/mail');
var User = require('./models/user.model'); 

var cloudinary = require('./cloudinary');



module.exports.login = (req, res, next) => {
  if(req.signedCookies.userId) {
    res.clearCookie('userId');
  }
  res.render('login');
}

module.exports.loginPost = async (req, res, next) => {
  var email = req.body.email;
  var user = await User.find({email : email})
  // var user = db.get('users').find({ email: email }).value();
  if (!user.length) {
    res.render('login', {
      "errors": ["Account doesn't not exist!"]
    })
    return;
  }
  //console.log(user);
  var pass = req.body.pass;
  if (user[0].wrongLoginCount > 3) {
    res.render('login', {
      "errors": ["Your account has been locked! Try after 100 years"],
      "values": req.body
    })
    return;
  }
  // 1 . convert req.body.pass => bcrypt 
  const hash = await bcrypt.hashSync(pass, saltRounds);
  console.log(hash);
  // 2 . compare current user's password and hash
  const check = await bcrypt.compareSync(process.env.PASSWORD, hash);
  console.log(check);

  if (check != true) {
    // update each time wrong password , count++ , >= 3 => lock
    // db.get('users')
    //   .find({ email: user.email })
    //   .assign({ wrongLoginCount: user.wrongLoginCount + 1 })
    //   .write()
    user[0].wrongLoginCount += 1;
    user[0].save(); 
    res.render('login', {
      "errors": ["Wrong password, try again!"],
      "values": req.body
    })
    return;
  }
  // reset lai countWrongPass if log in successfully
  // db.get('users')
  //   .find({ email: user.email })
  //   .assign({ wrongLoginCount: 0 })
  //   .write();
  await User.findOneAndUpdate({email : email} , {wrongLoginCount : 0});
  
  res.cookie('userId', user[0]._id, { signed: true });
  //user[0].wrongLoginCount = 0;
  console.log("user"  + user[0]);
  res.redirect('/transaction');
}

module.exports.forgotPass = (req, res, next) => {
  res.render('forgotPass');
}
module.exports.resetPass = async (req, res, next) => {

  var email = req.body.email;
  var user = await User.find({email : email});

  if (!user.length) {
    res.render('forgotPass', {
      "errors": ['Email is not registered!']
    })
    return;
  }
  const hash = await bcrypt.hashSync(process.env.PASSWORD, saltRounds);
  db.get('users')
    .find({ email: email })
    .assign({ pass: hash })
    .write();

  // RESET COUNT WRONG PASSWORD
  db.get('users')
    .find({ email: user.email })
    .assign({ wrongLoginCount: 0 })
    .write();
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'sykhanhsky@gmail.com',
    from: 'improveskillonetwothree@gmail.com',
    subject: 'Phi Khanh Cr',
    text: 'Dear Long, I have a big dick',
    html: '<strong>We would like to invite you join us for dinner tonight</strong> <p>I hope you will come</p>',
  };
  //ES6
  sgMail
    .send(msg)
    .then(() => { }, error => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body)
      }
    });


  res.redirect('/transaction');
}


module.exports.signIn = async (req, res , next ) => {
  res.render('signin');
}
module.exports.postSignIn = async (req, res , next ) => {
  
  var email = req.body.email;
  var user = await User.find({email : email });
  if(user.length) {
    res.render('signin' , {
      "errors" : ["Email already exists"]
    })
    return;
  }
  if(req.body.pass !== req.body.pass2) {
    res.render('signin' , {
      "errors" : ["2 passwords do not match"]
    })
    return;
  }
  var value = {};
  if(req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    value = {
      name : req.body.name ,
      email : req.body.email , 
      sdt : req.body.sdt,
      pass : req.body.pass,
      isAdmin : false ,
      wrongLoginCount : 0, 
      avatar : result.url
    } 
  } else {
    value = {
      name : req.body.name ,
      email : req.body.email , 
      sdt : req.body.sdt,
      pass : req.body.pass,
      isAdmin : false ,
      wrongLoginCount : 0
    }
  }
  await User.insertMany(value);
  res.redirect('/login');
}