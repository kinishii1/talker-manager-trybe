const express = require('express');

const router = express.Router();

const TalkerController = require('../controller/TalkerController');

router.get('/', TalkerController.getAllTalkers);

module.exports = router;