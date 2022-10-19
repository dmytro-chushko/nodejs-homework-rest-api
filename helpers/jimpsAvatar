const Jimp = require('jimp');

const jimosAvatar = async path => {
  const avatar = await Jimp.read(path);
  await avatar.resize(250, 250).writeAsync(path);
};

module.exports = jimosAvatar;
