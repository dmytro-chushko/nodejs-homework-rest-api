const multer = require('multer');
const path = require('path');

const maxAvatarSize = 200000;
const tempDir = path.join(__dirname, '../', 'temp');

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    filsize: maxAvatarSize,
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
