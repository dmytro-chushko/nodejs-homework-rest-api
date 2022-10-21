const signup = require('./signup');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const changeSubscription = require('./changeSubscription');
const updateAvatar = require('./updateAvatar.js');
const verifyEmail = require('./verifyEmail');
const resendingEmailVerification = require('./resendingEmailVerification');

module.exports = {
  signup,
  login,
  getCurrent,
  logout,
  changeSubscription,
  updateAvatar,
  verifyEmail,
  resendingEmailVerification,
};
