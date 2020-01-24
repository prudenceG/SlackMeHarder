const { Router } = require('express');
const messagesController = require('./../controllers/messages');
const { body } = require('express-validator');
const expressValidation = require('./../utils/expressValidation');

const router = Router();

router.get('/', messagesController.getMessagesByChannel);

router.post('/', expressValidation.validate([
  body('content')
    .not().isEmpty().withMessage('must be filled')
    .isLength({ max: 1500 }).withMessage('must be 1500 characters maximum')
    .trim(),
  body('channelId').isInt().withMessage('it must be a number')
]), messagesController.storeMessage);

router.put('/:id', expressValidation.validate([
  body('message')
    .not().isEmpty().withMessage('must be filled')
    .isLength({ max: 1500 }).withMessage('must be 1500 characters maximum')
    .trim(),
]), messagesController.updateMessage);

router.delete('/:id', messagesController.deleteMessage);

module.exports = router;
