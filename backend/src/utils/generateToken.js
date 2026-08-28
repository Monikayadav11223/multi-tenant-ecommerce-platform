const jwt = require('jsonwebtoken');

const generateToken = (userId, role, storeId) => {
  return jwt.sign({ userId, role, storeId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
