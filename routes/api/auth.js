const express = require('express');

const router = express.Router();
const { validation, ctrlWrapper, isValidId } = require('../../middlewares');
const { auth: ctrl } = require('../../controllers');
const { joiSignupSchema, joiLoginSchema } = require('../../models/user');

router.post('/signup', ctrlWrapper(ctrl.signup));

module.exports = router;
