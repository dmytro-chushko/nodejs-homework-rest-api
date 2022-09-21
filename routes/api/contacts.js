const express = require('express');

const router = express.Router();

const { listContacts, getContactById } = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: { result: contacts },
  });
});

router.get('/:contactId', async (req, res, next) => {
  const contactById = await getContactById(req.params.contactId);
  res.json({
    status: 'success',
    code: 200,
    data: { result: contactById },
  });
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
