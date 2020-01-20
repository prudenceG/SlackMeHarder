const { Router } = require('express');
const channelsController = require('../controllers/channels');

const router = Router();

router.post('/', channelsController.createChannel);
router.get('/', channelsController.getChannels);

module.exports = router;
