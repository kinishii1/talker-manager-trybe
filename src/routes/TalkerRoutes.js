const express = require('express');

const router = express.Router();

const TalkerController = require('../controller/TalkerController');

router.get('/', TalkerController.getAllTalkers);
router.get('/:id', TalkerController.getTalkerById);

module.exports = router;