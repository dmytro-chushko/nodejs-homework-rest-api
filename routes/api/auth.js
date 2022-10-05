const express = require('express');

const router = express.Router();
const { validation, ctrlWrapper, isValidId, auth } = require('../../middlewares');
const { auth: ctrl } = require('../../controllers');
const { joiSignupSchema, joiLoginSchema } = require('../../models/user');

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));
router.post('/signup', validation(joiSignupSchema), ctrlWrapper(ctrl.signup));
router.post('/login', validation(joiLoginSchema), ctrlWrapper(ctrl.login));

module.exports = router;
