const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db/db'); // DB-Verbindung prüfen
const router = express.Router();

// Registrierung Route
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: 'Alle Felder (username, email, password, role) sind erforderlich' });
  }

  try {
    // Benutzername oder E-Mail prüfen
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (rows.length > 0) {
      return res.status(400).json({ message: 'Benutzername oder E-Mail ist bereits vergeben' });
    }

    // Passwort hashen
    const hashedPassword = await bcrypt.hash(password, 10);

    // Benutzer einfügen
    const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
    const values = [username, email, hashedPassword, role];

    await pool.execute(query, values);

    res.status(200).json({ message: 'Registrierung erfolgreich' });
  } catch (err) {
    console.error('Fehler bei der Registrierung:', err);
    res.status(500).json({ message: 'Fehler bei der Registrierung', error: err.message });
  }
});

// Login-Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'E-Mail und Passwort sind erforderlich' });
  }

  try {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      console.log(`Benutzer mit E-Mail ${email} nicht gefunden`);
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Falsches Passwort");
      return res.status(401).json({ message: 'Falsches Passwort' });
    }

    console.log("Login erfolgreich für:", email);

    const modules = [
      { name: 'Grundlagen', id: 1 },
      { name: 'Datenbank', id: 2 },
      { name: 'Programmieren', id: 3 }
    ];

    res.status(200).json({ message: 'Login erfolgreich', modules });
  } catch (err) {
    console.error('Fehler beim Login:', err);
    res.status(500).json({ message: 'Fehler beim Login', error: err.message });
  }
});

module.exports = router;
