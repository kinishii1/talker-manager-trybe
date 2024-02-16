const path = require('path');
const readJsonData = require('../services/readJsonData');
const writeJsonData = require('../services/writeJsonData');

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

const createTalker = async (req, res) => {
  const data = await readJsonData(PATH);
  const newTalker = { id: data.length + 1, ...req.body };

  await writeJsonData(PATH, [...data, newTalker]);
  res.status(201).json(newTalker);
};

const updateTalker = async (req, res) => {
  const { id } = req.params;
  const data = await readJsonData(PATH);

  const foundTalker = data.find((talker) => talker.id === Number(id));
  if (!foundTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  const updatedTalker = { ...foundTalker, ...req.body };
  const updatedData = data.map((talker) => (talker.id === Number(id) ? updatedTalker : talker));
  await writeJsonData(PATH, updatedData);
  res.status(200).json(updatedTalker);
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  createTalker,
  updateTalker,
};
