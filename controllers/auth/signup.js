const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { nanooid } = require('nanoid');

const { User } = require('../../models');
const { sendMail } = require('../../helpers');

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  let hashPassword = '';
  if (password) {
    hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }
  const avatarUrl = gravatar.url(email);
  const verificationToken = nanooid();
  const result = await User.create({
    email,
    subscription,
    password: hashPassword,
    avatarUrl,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: 'Email Verification',
    html: `<a href='http://localhost:/3000/api/users/vrify/${verificationToken}'>Verificate your email</a>`,
  };
  await sendMail(mail);
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
