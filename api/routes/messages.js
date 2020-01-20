const { Router } = require('express');
const messagesController = require('./../controllers/messages');

const router = Router();

router.get('/', messagesController.getMessagesByChannel);
router.post('/', messagesController.storeMessage);
router.put('/:id', messagesController.updateMessage);
router.delete('/:id', messagesController.deleteMessage);

module.exports = router;
