const express = require('express');
var router = express.Router();
var db = require("./db.js");
var pug = require("pug");
var shortId = require("shortid");
var removeAccents = require("./removeAccents.js");


router.get("/users", (req, res) => {
  var user = db.get("users").value();
  res.render("user", {
    users: user
  });
});
router.get("/users/create", (req, res) => {
  res.render("createUser");
});
router.post("/users/create", (req, res) => {
  var name = req.body.name;
  var sdt = req.body.sdt;
  var id = shortId.generate();
  var value = {
    name: name,
    sdt: sdt,
    id: id
  };
  db.get("users")
    .push(value)
    .write();
  res.redirect("/users");
});

router.get("/users/search", (req, res) => {
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
});

router.get("/users/:id", (req, res) => {
  var id = req.params.id;
  db.get("users")
    .remove({ id: id })
    .write();
  res.redirect("/users");
});

router.get("/users/edit/:id", (req, res) => {
  res.render("userEdit");
});

router.post("/users/edit/:id", (req, res) => {
  var id = req.params.id;
  var value = req.body.edit;
  db.get("users")
    .find({ id: id })
    .assign({ name: value })
    .value();
  res.redirect("/users");
});


module.exports = router;