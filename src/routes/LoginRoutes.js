const express = require('express');

const router = express.Router();

const LoginController = require('../controller/LoginController');

router.post('/', LoginController.getTokenFromLogin);

module.exports = router;