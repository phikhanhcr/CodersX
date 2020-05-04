var db = require("./db.js");
var pug = require("pug");
var shortId = require("shortid");
var removeAccents = require("./removeAccents.js");
var md5 = require('md5');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = '123';
var User = require('./models/user.model');

var cloudinary = require('./cloudinary');

module.exports.index = async (req, res , next) => {
  try {
    var user = await User.find();

    res.render("user", {
      "users": user
    })
  } catch (err) {
    console.log(err);
    next(err);
  }
  
}

module.exports.create = (req, res) => {
  res.render("createUser");
}
module.exports.createPost = async (req, res) => {
  var email = req.body.email;
  var checkUnique = await User.find({ email: email });
  //var checkUnique = db.get('users').find({ email: email }).value();
  if (checkUnique.length) {
    res.render("createUser", {
      "errors": ['Email already exists!']
    });
    return;
  }
  var name = req.body.name;
  var sdt = req.body.sdt;
  //var id = shortId.generate();

  const password = await bcrypt.hashSync(myPlaintextPassword, saltRounds);
  var value = {};
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    value = {
      name: name,
      sdt: sdt,
      email: email,
      pass: password,
      avatar: result.url
      // avatar: '/' + req.file.path.split('/').slice(1).join('/')
    };
  } else {
    value = {
      name: name,
      sdt: sdt,
      email: email,
      pass: password,
    };
  }
  await User.insertMany(value);

  res.redirect("/users");
}

module.exports.search = async (req, res) => {
  var search = req.query.search;

  var listUser = await User.find();
  var list = listUser.filter(ele => {
    return removeAccents(ele.name).toLowerCase().indexOf(removeAccents(search).toLowerCase()) !== -1
  })
  res.render("user", {
    "users": list
  });
}

module.exports.remove = async (req, res) => {
  var id = req.params.id;
  await User.findByIdAndRemove({ _id: id })

  res.redirect("/users");
}

module.exports.edit = async (req, res) => {
  var id = req.params.id;
  var user = await User.find({ _id: id });
  res.render("userEdit", {
    "oldName": user[0].name,
    "oldAvatar": user[0].avatar
  });
}
module.exports.editPost = async (req, res) => {
  var id = req.params.id;
  var user = await User.find({ _id: id })
  var value = req.body.edit ? req.body.edit : user.name;

  if (!req.file) {

    await User.findByIdAndUpdate(id, { name: value });
    res.redirect("/users");
    return;
  }
  var filePath = req.file.path;
  const result = await cloudinary.uploader.upload(filePath);
  await User.findByIdAndUpdate(id, { name: value, avatar: result.url });

  res.redirect("/users");
}
