const express = require('express');

const router = express.Router();

const TalkerController = require('../controller/TalkerController');
const { validateToken,
  validateName,
  validateAge,
  validateTalkWA,
  validateTalkR } = require('../middlewares/talker');

router.get('/', TalkerController.getAllTalkers);
router.get('/:id', TalkerController.getTalkerById);
router.post('/',
  validateToken,
  validateName,
  validateAge,
  validateTalkWA,
  validateTalkR,
  TalkerController.createTalker);
router.put('/:id', 
  validateToken,
  validateName,
  validateAge,
  validateTalkWA,
  validateTalkR,
  TalkerController.updateTalker);

module.exports = router;