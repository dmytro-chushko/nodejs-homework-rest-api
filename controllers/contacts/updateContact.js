const contactsOperations = require('../../models/contacts');
const { NotFound, BadRequest } = require('http-errors');

const updateContact = async (req, res) => {
  const { contactId } = req.params;

  if (Object.keys(req.body).length === 0) {
    throw new BadRequest('missing fields');
  }
  const updatedContact = await contactsOperations.updateContact(contactId, req.body);
  if (!updatedContact) {
    throw new NotFound(`Contact whith id = ${contactId} not found`);
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: { updatedContact },
  });
};

module.exports = updateContact;
