const path = require("path");

const mimeType = {
  "js": 'text/javascript',
  "json": 'application/json',
  "jpg": 'image/jpeg'
}

module.exports = function (filePath) {
  const ext = path.extname(filePath)
    .split(".").pop().toLowerCase();
  if (!ext) {
    ext = filePath;
  }
  return mimeType[ext] || 'text/plain';
}