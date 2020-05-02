const express = require('express');
var router = express.Router();
var controller = require('../controller/user.js');



router.get("/users", controller.index);

router.patch("/users/:id", controller.edit);

router.get('/books', controller.book)

router.delete('/users/remove/:id', controller.remove);

router.get('/transaction', controller.transaction);

router.post('/postLogin', controller.postLogin);

router.put('/users/put/:id', controller.put);

module.exports = router;