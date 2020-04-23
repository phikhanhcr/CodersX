const express = require('express');
var router = express.Router();
var db = require("./db.js");
var pug = require("pug");
var shortId = require("shortid");
var removeAccents = require("./removeAccents.js");

router.get('/' , (req, res) => {
  var books = db.get('books').value();
  res.render('list');
})

module.exports = router;