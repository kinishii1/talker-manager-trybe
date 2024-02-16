const crypto = require('crypto');
const path = require('path');
const readJsonData = require('../services/readJsonData');

const PATH = path.join(__dirname, '..', 'talker.json');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

const getTokenFromLogin = async (_req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
}; 

module.exports = {
  getTokenFromLogin,
};
