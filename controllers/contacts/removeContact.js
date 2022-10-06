const { Contact } = require('../../models');
const { NotFound } = require('http-errors');

const removeContact = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const removedContact = await Contact.findOneAndDelete({ _id: contactId, owner: _id }).populate(
    'owner',
    '_id subscription email'
  );
  console.log(removedContact);
  if (!removedContact) {
    throw new NotFound(`Contact whith id = ${contactId} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    data: { message: removedContact },
  });
};

module.exports = removeContact;
