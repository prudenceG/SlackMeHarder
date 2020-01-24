const { Router } = require('express');
const channelsController = require('../controllers/channels');
const { body } = require('express-validator');
const expressValidation = require('./../utils/expressValidation');

const router = Router();

router.post('/', expressValidation.validate([
  body('name').not().isEmpty()
]), channelsController.createChannel);

router.get('/', channelsController.getChannels);

module.exports = router;
