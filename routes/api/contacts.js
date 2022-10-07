const express = require('express');

const router = express.Router();
const { validation, ctrlWrapper, isValidId, auth } = require('../../middlewares');
const { joiSchema, favoriteJoiSchema } = require('../../models/contacts');
const { contacts: ctrl } = require('../../controllers');

router.get('/', auth, ctrlWrapper(ctrl.listContacts));

router.get('/:contactId', auth, isValidId, ctrlWrapper(ctrl.getContactById));

router.post('/', auth, validation(joiSchema), ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', auth, isValidId, ctrlWrapper(ctrl.removeContact));

router.put('/:contactId', auth, isValidId, validation(joiSchema), ctrlWrapper(ctrl.updateContact));

router.patch(
  '/:contactId/favorite',
  auth,
  isValidId,
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
