const bcrypt = require('bcryptjs');

const { User } = require('../../models');

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  let hashPassword = '';
  if (password) {
    hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }
  const result = await User.create({ email, subscription, password: hashPassword });
  // const { subscription } = result;
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email,
        subscription: result.subscription,
      },
    },
  });
};

module.exports = signup;
