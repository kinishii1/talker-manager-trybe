const path = require('path');
const readJsonData = require('../services/readJsonData');
const writeJsonData = require('../services/writeJsonData');
const Talkers = require('../models/Talkers');
const { applyFilters } = require('../utils/queryFilters');

const PATH = path.join(__dirname, '..', 'talker.json');

class TalkerController {
  static async getAllTalkers(_req, res) {
    const data = await Talkers.findAllTalkers();
    return res.status(200).json(data);
  }

  static async getTalkerById(req, res) {
    const { id } = req.params;
    const data = await Talkers.findById(id);
  
    if (!data) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(200).json(data);
  }

  static async createTalker(req, res) {
    const { id } = req.params;
    const content = req.body;
    const data = await Talkers.createTalkerById(id, content);
    res.status(201).json(data);
  }

  static async updateTalker(req, res) {
    const { id } = req.params;
    const newContent = req.body;

    const data = await Talkers.updateTalkerById(id, newContent);
  
    if (!data) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(200).json(data);
  }

  static async deleteTalker(req, res) {
    const { id } = req.params;
    await Talkers.deleteTalkerById(id);
    res.status(204).end();
  }

  static async getTalkerByQuery(req, res) {
    const { q, rate, date } = req.query;
    const data = await readJsonData(PATH);

    const filteredData = applyFilters(data, q, rate, date);

    if (filteredData.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(filteredData);
  }

  static async updateRateTalker(req, res) {
    const { id } = req.params;
    const { rate } = req.body;
    const data = await readJsonData(PATH);
  
    const foundTalker = data.find((talker) => talker.id === Number(id));
    if (!foundTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  
    const updatedTalker = { ...foundTalker, talk: { ...foundTalker.talk, rate } };
    const updatedData = data.map((talker) => (talker.id === Number(id) ? updatedTalker : talker));
    await writeJsonData(PATH, updatedData);
    return res.status(204).json();
  }
}

module.exports = TalkerController;
