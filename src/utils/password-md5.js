const crypto = require("crypto");

const passwordmd5 = (password) => {
  const md5 = crypto.createHash("md5");
  const result = md5.update(password).digest("hex");
  return result;
};

module.exports = {
  passwordmd5,
};
