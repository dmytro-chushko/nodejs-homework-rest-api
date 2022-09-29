const { isValidObjectId } = require('mongoose');
const { BadRequest } = require('http-errors');

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const result = isValidObjectId(contactId);
  if (!result) {
    next(BadRequest(`${contactId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
