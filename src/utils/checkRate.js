const isFloat = require('./isFloat');

const checkRate = (rate) => {
  if (Number.isNaN(Number(rate))) return false;
  if (isFloat(Number(rate))) return false;
  if (Number(rate) < 1 || rate > 5) return false;
  return true;
};

module.exports = checkRate;