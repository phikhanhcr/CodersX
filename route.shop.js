const express = require('express');
var router = express.Router();
var controller = require('./controller.shop');
var multer = require('multer');
var upload = multer({ dest: './public/uploads' }); // ? don't know how to create the correct file path

var checkHasShop = require('./middleware/checkHasShop')

router.get('/:id' , controller.myShop)

router.get('/:id/create' , checkHasShop.checkHasShop , controller.createShop);

router.post('/:id/create' , upload.single('avatar') ,controller.postCreateShop);

router.get('/:id/createBook'  , controller.createBook);

router.post('/:id/createBook' , upload.single('avatar') ,controller.postCreateBook);

router.get('/:id/viewOne/:idBook' , controller.viewOne)

module.exports = router;