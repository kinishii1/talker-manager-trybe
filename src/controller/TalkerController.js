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

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const data = await readJsonData(PATH);

  const filteredData = data.filter((talker) => talker.id !== Number(id));
  await writeJsonData(PATH, filteredData);
  res.status(204).end();
};

// eslint-disable-next-line max-lines-per-function, complexity, sonarjs/cognitive-complexity
const getTalkerByName = async (req, res) => {
  const { q, rate, date } = req.query;
  const data = await readJsonData(PATH);

  if (!q && !rate && !date) return res.status(200).json(data);

  if (q && !rate && !date) {
    const filteredData = data
      .filter((talker) => talker.name.toLowerCase().includes(q.toLowerCase()));
    if (filteredData.length === 0) return res.status(200).json([]);
    return res.status(200).json(filteredData);
  }

  if (!q && rate && !date) {
    const filteredData = data.filter((talker) => talker.talk.rate === Number(rate));
    if (filteredData.length === 0) return res.status(200).json([]);
    return res.status(200).json(filteredData);
  }

  if (!q && !rate && date) {
    const filteredData = data.filter((talker) => talker.talk.watchedAt === date);
    if (filteredData.length === 0) return res.status(200).json([]);
    return res.status(200).json(filteredData);
  }

  if (q && rate && !date) {
    const filteredData = data
      .filter((talker) => talker.name.toLowerCase().includes(q.toLowerCase())
        && talker.talk.rate === Number(rate));
    if (filteredData.length === 0) return res.status(200).json([]);
    return res.status(200).json(filteredData);
  }

  if (q && !rate && date) {
    const filteredData = data
      .filter((talker) => talker.name.toLowerCase().includes(q.toLowerCase())
        && talker.talk.watchedAt === date);
    if (filteredData.length === 0) return res.status(200).json([]);
    return res.status(200).json(filteredData);
  }

  if (!q && rate && date) {
    const filteredData = data.filter((talker) => talker.talk.rate === Number(rate)
      && talker.talk.watchedAt === date);
    if (filteredData.length === 0) return res.status(200).json([]);
    return res.status(200).json(filteredData);
  }

  if (q && rate && date) {
    const filteredData = data
      .filter((talker) => talker.name.toLowerCase().includes(q.toLowerCase())
        && talker.talk.rate === Number(rate)
        && talker.talk.watchedAt === date);
    if (filteredData.length === 0) return res.status(200).json([]);
    return res.status(200).json(filteredData);
  }

  return res.status(200).json([]);
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  createTalker,
  updateTalker,
  deleteTalker,
  getTalkerByName,
};
