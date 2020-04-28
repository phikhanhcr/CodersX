const express = require('express');
var router = express.Router();
var controller = require('./controller.cart');

router.get('/add/:id' , controller.addCart);

router.get('/viewall' , controller.viewCart);

router.get('/hire', controller.hireBooks);

module.exports = router;