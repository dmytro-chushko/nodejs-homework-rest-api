const { Contact } = require('../../models');
const { NotFound } = require('http-errors');

const getContactById = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const contactById = await Contact.find({ _id: contactId, owner: _id }).populate(
    'owner',
    '_id subscription email'
  );
  if (!contactById) {
    throw new NotFound(`Contact whith id = ${contactId} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    data: { result: contactById },
  });
};

module.exports = getContactById;
