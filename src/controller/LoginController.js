const path = require('path');
const generateToken = require('../utils/generateToken');
const readJsonData = require('../services/readJsonData');

const PATH = path.join(__dirname, '..', 'talker.json');

const getTokenFromLogin = async (_req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
}; 

module.exports = {
  getTokenFromLogin,
};
