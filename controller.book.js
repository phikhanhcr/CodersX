var db = require("./db.js");
var pug = require("pug");
var shortId = require("shortid");
var removeAccents = require("./removeAccents.js");

module.exports.index = (req, res) => {
  var books = db.get("books").value();
  res.render("book", {
    books: books
  });
};
module.exports.create = (req, res) => {
  res.render("create");
};

module.exports.createPost = (req, res) => {
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
};

module.exports.search = (req, res) => {
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
};

module.exports.remove =  (req, res) => {
  var id = req.params.id;
  db.get("books")
    .remove({ id: id })
    .write();
  res.redirect("/books");
}

module.exports.edit = (req, res) => {
  res.render("edit");
}
module.exports.editPost = (req, res) => {
  var id = req.params.id;
  var value = req.body.edit;
  db.get("books")
    .find({ id: id })
    .assign({ title: value })
    .value();
  res.redirect("/books");
}