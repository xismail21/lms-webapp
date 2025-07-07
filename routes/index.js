const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db/db');  // Deine DB-Verbindung
const bcrypt = require('bcrypt');
const authRouter = require('./routes/auth');  // Auth-Router, z.B. Login und Register-Routen

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Auth-Route einbinden
app.use('/auth', authRouter);

// Test-Route für die Verbindung
app.get('/', (req, res) => {
  res.send('Index-Route wurde aufgerufen');
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
