const jwt = require("jsonwebtoken");
const secret = "Tokenforusercreatingblogs";

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    firstName: user.firstName,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, secret);
};

const validateToken = (token) => {
  return jwt.verify(token, secret);
};

module.exports = { generateToken, validateToken };
