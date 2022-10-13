const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const { User } = require('../../models');

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  let hashPassword = '';
  if (password) {
    hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }
  const avatarUrl = gravatar.url(email);
  const result = await User.create({ email, subscription, password: hashPassword, avatarUrl });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email,
        subscription: result.subscription,
        avatar: result.avatarUrl,
      },
    },
  });
};

module.exports = signup;
