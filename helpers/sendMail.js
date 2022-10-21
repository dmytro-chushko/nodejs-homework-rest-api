const sgMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async data => {
  const email = { ...data, from: 'dmytro.chushko@gmail.com' };
  // eslint-disable-next-line no-useless-catch
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendMail;
