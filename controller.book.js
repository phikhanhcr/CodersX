var db = require("./db.js");
var pug = require("pug");
var shortId = require("shortid");
var removeAccents = require("./removeAccents.js");
var Book = require('./models/book.model');
var pagenation = require('./pagenation');

module.exports.index = async (req, res) => {
  // var books = db.get("books").value();
  var books = await Book.find();
  var page = req.query.page || 1;
  var perPage = 8;
  var start = (page - 1) * perPage;
  var end = page * perPage;
  var currentPage = req.query.page ? req.query.page : 1;
  var listPaganation = pagenation(currentPage , 13);  
  res.render("book", {
    "books": books.slice(start, end),
    "fixed1": listPaganation[0],
    "fixed2": listPaganation[1],
    "fixed3": listPaganation[2],
    "pagenation" : listPaganation,
    "currentPage": currentPage
  });
};

module.exports.create = (req, res) => {
  res.render("create");
};

module.exports.createPost = async (req, res) => {
  var title = req.body.title;
  var desc = req.body.desc;

  var value = {
    title: title,
    desc: desc
  };
  await Book.insertMany(value);

  res.redirect("/books");
};

module.exports.search = async (req, res) => {
  var search = req.query.title;
  var page = req.query.page || 1;
  var perPage = 8;
  var start = (page - 1) * perPage;
  var end = page * perPage;
  var listBook = await Book.find();
  var books = listBook.filter(ele => {
    return removeAccents(ele.title).toLowerCase().indexOf(removeAccents(search).toLowerCase()) !== -1
  })
 
  res.render("book", {
    "books": books.slice(start, end)
  });
};

module.exports.remove = async (req, res) => {
  var id = req.params.id;
  await Book.findByIdAndRemove(id);
  // db.get("books")
  //   .remove({ id: id })
  //   .write();
  res.redirect("/books");
}

module.exports.edit = (req, res) => {
  res.render("edit");
}
module.exports.editPost = async (req, res) => {
  var id = req.params.id;
  var value = req.body.edit;

  await Book.findByIdAndUpdate(id , {title : value});
  // db.get("books")
  //   .find({ id: id })
  //   .assign({ title: value })
  //   .value();
  res.redirect("/books");
}

module.exports.view = async (req, res, next) => {
  var id = req.params.id;
  var pageCurrent = req.query.page ? req.query.page : 1;
  //var book = db.get('books').find({ id: id }).value();
  var book = await Book.findById(id);
  res.render('viewOne', {
    "book": book,
    "pageCurrent": pageCurrent
  });
}