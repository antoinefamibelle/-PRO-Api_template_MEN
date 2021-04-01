const express = require('express');
const app = express();
const config = require('config');
const port = config.get('serverPort');
const cors = require('cors');
const logger = require('nationalogger');
const connectDatabase = require('natiodb');
const url = config.get('mongoURI');


/* Connection a la base de donnee */

connectDatabase(url);

app.set('trust-proxy', 1);
app.use(cors());
app.use(express.json({ extended: false }));

app.use('/api/', require('./router.js')); // Router qui contient toutes les routes de votre api

// Route de test pour voir si le server repond
app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(port, () => {
  logger.info(`server currently listening at http://localhost:${port}`)
});