var db = require('./db');
var md5 = require('md5');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const sgMail = require('@sendgrid/mail');

module.exports.login = (req, res, next) => {
  res.render('login');
}

module.exports.loginPost = async (req, res, next) => {
  var email = req.body.email;
  var user = db.get('users').find({ email: email }).value();
  if (!user) {
    res.render('login', {
      "errors": ["Account doesn't not exist!"]
    })
    return;
  }
  var pass = req.body.pass;
  if (user.wrongLoginCount >= 3) {
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
    db.get('users')
      .find({ email: user.email })
      .assign({ wrongLoginCount: user.wrongLoginCount + 1 })
      .write()
    res.render('login', {
      "errors": ["Wrong password, try again!"],
      "values": req.body
    })
    return;
  }
  // reset lai countWrongPass if log in successfully
  db.get('users')
    .find({ email: user.email })
    .assign({ wrongLoginCount: 0 })
    .write();
  res.cookie('userId', user.id, { signed: true });
  user.wrongLoginCount = 0;
  res.redirect('/transaction');
}

module.exports.forgotPass = (req, res, next) => {
  res.render('forgotPass');
}
module.exports.resetPass = async (req, res, next) => {

  var email = req.body.email;
  var user = db.get('users').find({ email: email }).value();

  if (!user) {
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
  res.redirect('/transaction');
}
module.exports.sendEmail = (req, res, next) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'test@example.com',
    from: 'test@example.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
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
  //ES8
  (async () => {
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body)
      }
    }
  })();
}