const express = require('express');

const router = express.Router();

const TalkerController = require('../controller/TalkerController');
const { validateToken,
  validateName,
  validateAge,
  validateTalkWA,
  validateTalkR } = require('../middlewares/talker');

router.get('/', TalkerController.getAllTalkers);
router.get('/search', validateToken, TalkerController.getTalkerByName);
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
router.delete('/:id', validateToken, TalkerController.deleteTalker);

module.exports = router;