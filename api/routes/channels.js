const { Router } = require('express');
const channelsController = require('../controllers/channels');
const { body } = require('express-validator');
const expressValidation = require('./../utils/expressValidation');
const rules = require('./../utils/validatorsRules');

const router = Router();

router.post('/', expressValidation.validate([
  body('name')
    .not().isEmpty()
    .trim()
    .custom(rules.onlySpacesForbidden).withMessage('must be filled')
]), channelsController.createChannel);

router.get('/', channelsController.getChannels);

module.exports = router;
