const express = require('express');
var router = express.Router();

var controller = require('./controller.user.js');


router.get("/users", controller.index );
router.get("/users/create", controller.create);
router.post("/users/create", controller.createPost);

router.get("/users/search", controller.search );

router.get("/users/:id", controller.remove );

router.get("/users/edit/:id", controller.edit);

router.post("/users/edit/:id", controller.editPost );


module.exports = router;