const { Router } = require('express');
const authController = require('../controllers/auth');
const { body } = require('express-validator');
const expressValidation = require('./../utils/expressValidation');
const rules = require('./../utils/validatorsRules');

const router = Router();

router.get('/whoami', authController.whoAmI);

router.post('/signup', expressValidation.validate([
  body('username')
    .not().isEmpty().withMessage('must be filled')
    .trim()
    .custom(rules.onlySpacesForbidden).withMessage('must be filled'),
  body('password')
    .not().isEmpty().withMessage('must be filled')
    .trim()
    .custom(rules.onlySpacesForbidden).withMessage('must be filled')
]), authController.signup);

router.post('/signin', expressValidation.validate([
  body('username')
    .not().isEmpty().withMessage('must be filled')
    .trim()
    .custom(rules.onlySpacesForbidden).withMessage('must be filled'),
  body('password')
    .not().isEmpty().withMessage('must be filled')
    .trim()
    .custom(rules.onlySpacesForbidden).withMessage('must be filled')
]), authController.signin);

module.exports = router;
