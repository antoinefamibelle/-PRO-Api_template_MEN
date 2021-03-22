const express = require('express');
const app = express();
const config = require('config');
const port = config.get('serverPort');
const connectDatabase = require('./config/db.js');
const cors = require('cors');

/* Connection a la base de donnee */

//connectDatabase();

app.set('trust-proxy', 1);
app.use(cors());
app.use(express.json({ extended: false }));

app.use('/api/', require('./router.js')); // Router qui contient toutes les routes de votre api

// Route de test pour voir si le server repond
app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(port, () => {
  console.log(`server currently listening at http://localhost:${port}`)
});