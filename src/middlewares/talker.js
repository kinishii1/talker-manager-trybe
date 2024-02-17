const isFloat = require('../utils/isFloat');

const rateMessage = 'O campo "rate" deve ser um número inteiro entre 1 e 5';

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório', 
    }); 
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (age === undefined) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (!Number.isInteger(age) || age < 18) {
    return res
      .status(400)
      .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
  }
  next();
};

const validateTalkWA = (req, res, next) => {
  const { talk } = req.body;
  const dateRegex = /(\d{2})\/(\d{2})\/(\d{4})/;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  if (!talk.watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (dateRegex.test(talk.watchedAt) === false) {
    return res
      .status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateTalkR = (req, res, next) => {
  const { talk } = req.body;
  if (talk.rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (isFloat(talk.rate)) {
    return res.status(400)
      .json({ message: rateMessage });
  }
  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400)
      .json({ message: rateMessage });
  }
  next();
};

// eslint-disable-next-line complexity
const validateRate = (req, res, next) => {
  const { rate } = req.body;
  if (rate === undefined) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  if (Number.isNaN(Number(rate))) {
    return res.status(400)
      .json({ message: rateMessage });
  }
  if (isFloat(rate)) {
    return res.status(400)
      .json({ message: rateMessage });
  }
  if (Number(rate) < 1 || rate > 5) {
    return res.status(400)
      .json({ message: rateMessage });
  }
  next();
};

module.exports = {
  validateToken,
  validateName,
  validateAge,
  validateTalkWA,
  validateTalkR,
  validateRate,
};