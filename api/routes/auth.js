const { Router } = require('express');
const authController = require('../controllers/auth');
const { body } = require('express-validator');
const expressValidation = require('./../utils/expressValidation');

const router = Router();

router.get('/whoami', authController.whoAmI);

router.post('/signup', expressValidation.validate([
  body('username').not().isEmpty(),
  body('password').not().isEmpty()
]), authController.signup);

router.post('/signin', expressValidation.validate([
  body('username').not().isEmpty(),
  body('password').not().isEmpty()
]), authController.signin);

module.exports = router;
