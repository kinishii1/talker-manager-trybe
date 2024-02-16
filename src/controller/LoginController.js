const generateToken = require('../utils/generateToken');

const getTokenFromLogin = async (_req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
}; 

module.exports = {
  getTokenFromLogin,
};
