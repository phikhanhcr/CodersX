const express = require('express');
var router = express.Router();

var controller = require('./controller.book.js');

var validation = require('./validation/checkInput');

function abc(req, res, next) {
  var x = 5;
  console.log(x);
  res.locals.hi = x;
  res.send('hello');
  next();
}
function md2(req, res, next) {
  console.log(res.locals.hi);
  console.log(x);
}

router.get('/test' , abc , md2);

router.get("/", controller.index);

router.get("/create", controller.create);
router.post("/create", validation.createBook ,controller.createPost);

router.get("/search", controller.search);

router.get("/:id", controller.remove );

router.get("/edit/:id", controller.edit);

router.post("/edit/:id", controller.editPost);

router.get("/view/:id", controller.view);

module.exports = router;