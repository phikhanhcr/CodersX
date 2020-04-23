const express = require('express');
var router = express.Router();
var db = require("./db.js");
var pug = require("pug");
var shortId = require("shortid");
var removeAccents = require("./removeAccents.js");

router.get("/", (req, res) => {
  var books = db.get("books").value();
  res.render("book", {
    books: books
  });
});

router.get("/create", (req, res) => {
  res.render("create");
});
router.post("/create", (req, res) => {
  var title = req.body.title;
  var desc = req.body.desc;
  var id = shortId.generate();
  var value = {
    title: title,
    desc: desc,
    id: id
  };
  db.get("books")
    .push(value)
    .write();
  res.redirect("/books");
});

router.get("/search", (req, res) => {
  var search = req.query.search;
  var list = db
    .get("books")
    .value()
    .filter(ele => {
      return (
        removeAccents(ele.title)
          .toLowerCase()
          .indexOf(removeAccents(search).toLowerCase()) !== -1
      );
    });
  res.render("book", {
    books: list
  });
});

router.get("/:id", (req, res) => {
  var id = req.params.id;
  db.get("books")
    .remove({ id: id })
    .write();
  res.redirect("/books");
});

router.get("/edit/:id", (req, res) => {
  res.render("edit");
});
router.post("/edit/:id", (req, res) => {
  var id = req.params.id;
  var value = req.body.edit;
  db.get("books")
    .find({ id: id })
    .assign({ title: value })
    .value();
  res.redirect("/books");
});


module.exports = router;