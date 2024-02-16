const express = require('express');

const router = express.Router();
const validateLogin = require('../middlewares/login');

const LoginController = require('../controller/LoginController');

router.post('/', validateLogin, LoginController.getTokenFromLogin);

module.exports = router;