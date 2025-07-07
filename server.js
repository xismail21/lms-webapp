const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan'); // Logging-Tool für Anfragen
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev')); // Debugging für Anfragen

// Routen importieren
const authRoutes = require('./routes/auth'); // Importiere den Auth-Router

// Routen verwenden
app.use('/auth', authRoutes); // Verwende die Auth-Routen für /auth

// Index-Route
app.get('/', (req, res) => {
    console.log('Index-Route wurde aufgerufen'); // Debug-Log für Index
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Globale Fehlerbehandlung
app.use((err, req, res, next) => {
    console.error('Globaler Fehler:', err); // Protokollierung von Fehlern
    res.status(err.status || 500).json({ error: err.message });
});

// 404-Fehlerbehandlung
app.use((req, res) => {
    console.warn(`404: ${req.originalUrl}`); // Warnung bei nicht gefundenen Routen
    res.status(404).send('Seite nicht gefunden');
});



// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
