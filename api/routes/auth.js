const { Router } = require('express');
const authController = require('../controllers/auth');

const router = Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.get('/whoami', authController.whoAmI);

module.exports = router;
