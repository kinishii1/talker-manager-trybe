const express = require('express');

const router = express.Router();

const TalkerController = require('../controller/TalkerController');
const { validateToken,
  validateName,
  validateAge,
  validateTalkWA,
  validateTalkR,
  validateRate,
} = require('../middlewares/talker');
const { validateRateQuery, validateWatchedDate } = require('../middlewares/query');

router.get('/', TalkerController.getAllTalkers);
router.get('/search',
  validateToken,
  validateRateQuery,
  validateWatchedDate,
  TalkerController.getTalkerByName);
router.get('/:id', validateToken, TalkerController.getTalkerById);
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
router.patch('/rate/:id', validateToken, validateRate, TalkerController.updateRateTalker);

module.exports = router;