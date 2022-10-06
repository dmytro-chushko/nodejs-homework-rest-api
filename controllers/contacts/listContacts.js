const { Contact } = require('../../models');

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find(favorite ? { owner: _id, favorite } : { owner: _id }, '', {
    skip,
    limit: +limit,
  }).populate('owner', '_id subscription email');
  res.json({
    status: 'success',
    code: 200,
    data: { result: contacts },
  });
};

module.exports = listContacts;
