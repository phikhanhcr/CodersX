var db = require("./db.js");
var pug = require("pug");
var shortId = require("shortid");
var removeAccents = require("./removeAccents.js");
var md5 = require('md5');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = '123';
var cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'pklevi',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


module.exports.index = (req, res) => {
  var user = db.get("users").value();
  res.render("user", {
    "users": user
  });
}

module.exports.create = (req, res) => {
  res.render("createUser");
}
module.exports.createPost = async (req, res) => {
  var email = req.body.email;
  var checkUnique = db.get('users').find({ email: email }).value();
  if (checkUnique) {
    res.render("createUser", {
      "errors": ['Email already exists!']
    });
    return;
  }
  var name = req.body.name;
  var sdt = req.body.sdt;
  var id = shortId.generate();

  const password = await bcrypt.hashSync(myPlaintextPassword, saltRounds);
  var value = {
    name: name,
    sdt: sdt,
    id: id,
    email: email,
    pass: password,
    avatar: '/' + req.file.path.split('/').slice(1).join('/')
  };
  console.log(value.avatar);
  db.get("users")
    .push(value)
    .write();
  res.redirect("/users");
}

module.exports.search = (req, res) => {
  var search = req.query.search;
  var list = db
    .get("users")
    .value()
    .filter(ele => {
      return (
        removeAccents(ele.name)
          .toLowerCase()
          .indexOf(removeAccents(search).toLowerCase()) !== -1
      );
    });
  res.render("user", {
    "users": list
  });
}

module.exports.remove = (req, res) => {
  var id = req.params.id;
  db.get("users")
    .remove({ id: id })
    .write();
  res.redirect("/users");
}

module.exports.edit = (req, res) => {
  var id = req.params.id;
  var user = db.get('users').find({id : id}).value();
  res.render("userEdit", {
    "oldName" : user.name,
    "oldAvatar" : user.avatar
  });
}
module.exports.editPost = async (req, res) => {
  var id = req.params.id;
  var user = db.get('users').find({id : id}).value();
  var value = req.body.edit ? req.body.edit : user.name;

  if (!req.file) {
    db.get('users')
      .find({ id: id })
      .assign({ name: value })
      .write();
    res.redirect("/users");
    return;
  }
  var filePath = req.file.path;
  const result = await cloudinary.uploader.upload(filePath);
  db.get("users")
    .find({ id: id })
    .assign({ name: value })
    .assign({ avatar: result.url })
    .write();
  //console.log(result);
  res.redirect("/users");
}

module.exports.updateAvatar = (req, res) => {
  // cloudinary.uploader.upload("./public/images/doremon.jpg", 
  //   function(error, result) {console.log(result.url)});
  res.render('updateAvatar');
}



// view books
// pagination