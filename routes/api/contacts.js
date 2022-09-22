const express = require('express');

const router = express.Router();
const { NotFound, BadRequest } = require('http-errors');
const Joi = require('joi');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: { result: contacts },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await getContactById(contactId);
    if (!contactById) {
      throw new NotFound(`Contact whith id = ${contactId} not found`);
    }
    res.json({
      status: 'success',
      code: 200,
      data: { result: contactById },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const newContact = await addContact(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { newContact },
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removedContact = await removeContact(contactId);
    if (!removedContact) {
      throw new NotFound(`Contact whith id = ${contactId} not found`);
    }
    res.json({
      status: 'success',
      code: 200,
      data: { message: 'contact deleted' },
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (Object.keys(req.body).length === 0) {
      throw new BadRequest('missing fields');
    }
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const updatedContact = await updateContact(contactId, req.body);
    if (!updatedContact) {
      throw new NotFound(`Contact whith id = ${contactId} not found`);
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      data: { updatedContact },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
