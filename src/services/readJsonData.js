const fs = require('fs').promises;

const readJsonData = async (_path) => {
  try {
    const data = await fs.readFile(_path, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading file:', error);
  }
};

module.exports = readJsonData;