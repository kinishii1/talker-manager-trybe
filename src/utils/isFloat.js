function isFloat(value) {
  return Number(value) === value && value % 1 !== 0;
}

module.exports = isFloat;