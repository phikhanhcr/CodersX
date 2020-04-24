const express = require('express');
var router = express.Router();

var controller = require('./controller.user.js');

var validation = require('./validation/checkInput');

router.get("/", controller.index );
router.get("/create", controller.create);
router.post("/create", validation.createUser , controller.createPost);

router.get("/search", controller.search );

router.get("/:id", controller.remove );

router.get("/edit/:id", controller.edit);

router.post("/edit/:id", controller.editPost );

module.exports = router;