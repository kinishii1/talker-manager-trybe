const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const TalkerRoutes = require('./routes/TalkerRoutes');
const LoginRoutes = require('./routes/LoginRoutes');

const app = express();
app.use(express.json());

app.use('/talker', TalkerRoutes);
app.use('/login', LoginRoutes);

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
