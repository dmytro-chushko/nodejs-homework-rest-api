const { Contact } = require('../../models');
const { NotFound, BadRequest } = require('http-errors');

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  if (Object.keys(req.body).length === 0) {
    throw new BadRequest('missing fields');
  }
  const updatedContact = await Contact.findOneAndUpdate({ _id: contactId, owner: _id }, req.body, {
    new: true,
  }).populate('owner', '_id subscription email');
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
