const express = require('express');
var router = express.Router();
var controller = require('./controller.Login');

//var validation = require('./validation/checkLogin');

router.get('/', controller.login);

router.post('/', controller.loginPost);

router.get('/forgot', controller.forgotPass);

router.post('/forgot', controller.resetPass); 

module.exports = router;