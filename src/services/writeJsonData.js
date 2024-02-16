const fs = require('fs').promises;

const writeJsonData = async (path, newContent) => {
  try {
    await fs.writeFile(path, JSON.stringify(newContent, null, 2));
  } catch (error) {
    console.error('Error writing file:', error);
  }
};

module.exports = writeJsonData;