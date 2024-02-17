const path = require('path');
const readJsonData = require('../services/readJsonData');
const writeJsonData = require('../services/writeJsonData');

const PATH = path.join(__dirname, '..', 'talker.json');

const findAllTalkers = async () => {
  const data = await readJsonData(PATH);
  if (data.length === 0) return [];
  return data;
};

const findById = async (id) => {
  const data = await readJsonData(PATH);
  return data.find((talker) => talker.id === Number(id));
};

const createTalkerById = async (id, content) => {
  const data = await readJsonData(PATH);
  const newTalker = { id: data.length + 1, ...content };
  await writeJsonData(PATH, [...data, newTalker]);
  return newTalker;
};

const updateTalkerById = async (id, newContent) => {
  const data = await readJsonData(PATH);
  const foundTalker = data.find((talker) => talker.id === Number(id));
  if (!foundTalker) return null;
  const updatedTalker = { ...foundTalker, ...newContent };
  const updatedData = data.map((talker) => (talker.id === Number(id) ? updatedTalker : talker));
  await writeJsonData(PATH, updatedData);
  return updatedTalker;
};

const deleteTalkerById = async (id) => {
  const data = await readJsonData(PATH);
  const filteredData = data.filter((talker) => talker.id !== Number(id));
  await writeJsonData(PATH, filteredData);
};

module.exports = { findAllTalkers, findById, createTalkerById, updateTalkerById, deleteTalkerById };