const express = require('express');
var router = express.Router();

var controller = require('./controller.transaction.js');

router.get('/' , controller.index)

router.get('/create' , controller.create)

router.post('/create' , controller.createPost);

router.get('/:id' , controller.remove)

router.get('/:id/complete' , controller.complete ); 

module.exports = router;