const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { APP_SECRET_USER, APP_SECRET_ENDPOINT } = require("../config");

module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  const hashedPassword = await this.GeneratePassword(enteredPassword, salt);
  return hashedPassword === savedPassword;
};

module.exports.GenerateSignature = async (payload, isUserValidation) => {
  const secret = isUserValidation ? APP_SECRET_USER : APP_SECRET_ENDPOINT;
  return await jwt.sign(payload, secret, { expiresIn: "1d" });
};

module.exports.ValidateSignature = async (signature, isUserValidation) => {
  if (signature) {
    const secret = isUserValidation ? APP_SECRET_USER : APP_SECRET_ENDPOINT;
    await jwt.verify(signature.split(" ")[1], secret);
    return true;
  }
  return false;
};

module.exports.ErrorHandler = async (res, message) => {
  return res.status(400).json({ error: 1, msg: message });
};
