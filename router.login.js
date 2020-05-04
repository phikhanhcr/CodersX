const express = require('express');
var router = express.Router();
var controller = require('./controller.Login');

var multer = require('multer');
var upload = multer({ dest: './public/uploads' }); // ? don't know how to create the correct file path

//var validation = require('./validation/checkLogin');

router.get('/', controller.login);

router.post('/', controller.loginPost);

router.get('/forgot', controller.forgotPass);

router.post('/forgot', controller.resetPass); 

router.get('/signin' , controller.signIn);

router.post('/signin' ,upload.single('avatar') , controller.postSignIn);

module.exports = router;