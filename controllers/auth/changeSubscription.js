const { User } = require('../../models');

const changeSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;

  if (!subscription) {
    throw new BadRequest('missing fields');
  }
  const updatedUser = await User.findOneAndUpdate({ _id }, { subscription }, { new: true });
  res.status(200).json({
    emai: updatedUser.email,
    subscription: updatedUser.subscription,
  });
};

module.exports = changeSubscription;
