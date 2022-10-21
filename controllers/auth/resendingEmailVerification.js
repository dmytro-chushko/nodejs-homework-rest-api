const { NotFound } = require('http-errors');
const { sendMail } = require('../../helpers');

const resendingEmailVerification = async (req, res) => {
  const { email } = req.body;
  const { user } = req;
  if (email !== user.email) {
    throw new NotFound('User not found');
  }
  if (user.verify) {
    res.status(400).json({
      message: 'Verification has already passed',
    });
  }
  const mail = {
    to: email,
    subject: 'Email Verification',
    html: `<a href='http://localhost:/3000/api/users/vrify/${user.verificationToken}'>Verificate your email</a>`,
  };
  await sendMail(mail);
  res.status(200).json({
    message: 'Verification email sent',
  });
};

module.exports = resendingEmailVerification;
