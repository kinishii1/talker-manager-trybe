const path = require('path');
const readJsonData = require('../services/readJsonData');

const PATH = path.join(__dirname, '..', 'talker.json');

const getAllTalkers = async (_req, res) => {
  const data = await readJsonData(PATH);

  if (data.length === 0) return res.status(200).json([]);

  res.status(200).json(data);
};

const getTalkerById = async (req, res) => {
  const { id } = req.params;
  const data = await readJsonData(PATH);

  const foundTalker = data.find((talker) => talker.id === Number(id));

  if (!foundTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(foundTalker);
};

module.exports = {
  getAllTalkers,
  getTalkerById,
};
