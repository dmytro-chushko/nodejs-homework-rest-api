const express = require('express');

const router = express.Router();
const { validation, ctrlWrapper, auth } = require('../../middlewares');
const { auth: ctrl } = require('../../controllers');
const { joiSignupSchema, joiLoginSchema, joiSubscriprtion } = require('../../models/user');

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));
router.post('/signup', validation(joiSignupSchema), ctrlWrapper(ctrl.signup));
router.post('/login', validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.get('/logout', auth, ctrlWrapper(ctrl.logout));
router.patch(
  '/subscription',
  auth,
  validation(joiSubscriprtion),
  ctrlWrapper(ctrl.changeSubscription)
);
module.exports = router;