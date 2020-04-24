var db = require("./db.js");
var pug = require("pug");
var shortId = require("shortid");
var removeAccents = require("./removeAccents.js");

module.exports.index = (req, res) => {
  var user = db.get("users").value();
  res.render("user", {
    users: user
  });
}

module.exports.create = (req, res) => {
  res.render("createUser");
}
module.exports.createPost = (req, res) => {
  var email = req.body.email;
  var checkUnique = db.get('users').find({email : email}).value();
  if(checkUnique) {
    res.render("createUser" , {
      "errors" : ['Email already exists!']
    });
    return;
  }
  var name = req.body.name;
  var sdt = req.body.sdt;
  var id = shortId.generate();
  var value = {
    name: name,
    sdt: sdt,
    id: id ,
    email : email,
    pass : 123
  };
  db.get("users")
    .push(value)
    .write();
  res.redirect("/users");
}

module.exports.search =  (req, res) => {
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
    users: list
  });
}

module.exports.remove =  (req, res) => {
  var id = req.params.id;
  db.get("users")
    .remove({ id: id })
    .write();
  res.redirect("/users");
}

module.exports.edit = (req, res) => {
  res.render("userEdit");
}
module.exports.editPost = (req, res) => {
  var id = req.params.id;
  var value = req.body.edit;
  db.get("users")
    .find({ id: id })
    .assign({ name: value })
    .value();
  res.redirect("/users");
}