const { Contact } = require('../../models');
const { NotFound, BadRequest } = require('http-errors');

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (Object.keys(req.body).length === 0) {
    throw new BadRequest('missing fields');
  }
  const updatedContact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
  if (!updatedContact) {
    throw new NotFound(`Contact whith id = ${contactId} not found`);
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: { updatedContact },
  });
};

module.exports = updateFavorite;