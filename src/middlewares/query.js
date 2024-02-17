const isFloat = require('../utils/isFloat');

// eslint-disable-next-line complexity
const validateRateQuery = (req, res, next) => {
  const { rate } = req.query;
  if (!rate) return next();
  if (Number.isNaN(Number(rate))) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  if (isFloat(Number(rate))) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  if (Number(rate) < 1 || rate > 5) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};

const validateWatchedDate = (req, res, next) => {
  const { date } = req.query;
  if (!date) {
    return next();
  }
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(date)) {
    return res.status(400)
      .json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = {
  validateRateQuery,
  validateWatchedDate,
};