const express = require('express');

const router = express.Router();
const { validation, ctrlWrapper, isValidId } = require('../../middlewares');
const { auth: ctrl } = require('../../controllers');
const { joiSignupSchema, joiLoginSchema } = require('../../models/user');

router.post('/signup', validation(joiSignupSchema), ctrlWrapper(ctrl.signup));
router.post('/login', validation(joiLoginSchema), ctrlWrapper(ctrl.login));

module.exports = router;
