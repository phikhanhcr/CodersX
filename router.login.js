const express = require('express');
var router = express.Router();

var controller = require('./controller.Login');

//var validation = require('./validation/checkLogin');

router.get('/', controller.login);

router.post('/', controller.loginPost);


module.exports = router;