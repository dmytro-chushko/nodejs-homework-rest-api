const path = require('path');
const fs = require('fs/promises');
const { User } = require('../../models');
const { jimpsAvatar } = require('../../helpers');

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;

  try {
    await jimpsAvatar(tempUpload);
    const resultUpload = path.join(__dirname, '../../', 'public', 'avatars', imageName);
    await fs.rename(tempUpload, resultUpload);
    const avatarUrl = path.join('public', 'avatars', imageName);
    await User.findByIdAndUpdate(req.user._id, { avatarUrl });
    res.json({ avatarUrl });
  } catch (error) {
    await fs.unlink(tempUpload);
    console.log(error);
    throw error;
  }
};

module.exports = updateAvatar;
