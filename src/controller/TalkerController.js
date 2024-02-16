const path = require('path');
const readJsonData = require('../services/readJsonData');

const PATH = path.join(__dirname, '..', 'talker.json');

const getAllTalkers = async (_req, res) => {
  const data = await readJsonData(PATH);

  if (data.length === 0) return res.status(200).json([]);

  res.status(200).json(data);
};

module.exports = {
  getAllTalkers,
};
