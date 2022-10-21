const express = require('express');

const router = express.Router();
const { validation, ctrlWrapper, auth, upload } = require('../../middlewares');
const { auth: ctrl } = require('../../controllers');
const {
  joiSignupSchema,
  joiLoginSchema,
  joiSubscriprtion,
  joiEmailSchema,
} = require('../../models/user');

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));
router.post('/signup', validation(joiSignupSchema), ctrlWrapper(ctrl.signup));
router.get('./verify/:verificationToken', auth, ctrlWrapper(ctrl.verifyEmail));
router.post(
  './verify',
  auth,
  validation(joiEmailSchema),
  ctrlWrapper(ctrl.resendingEmailVerification)
);
router.post('/login', validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.get('/logout', auth, ctrlWrapper(ctrl.logout));
router.patch(
  '/subscription',
  auth,
  validation(joiSubscriprtion),
  ctrlWrapper(ctrl.changeSubscription)
);
router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;
