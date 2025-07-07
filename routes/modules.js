const express = require('express');
const router = express.Router();
const connection = require('../db/db');

// Module abrufen
router.get('/', async (req, res) => {
    try {
        const [modules] = await connection.query('SELECT * FROM modules');
        res.json(modules);
    } catch (error) {
        console.error('Fehler beim Abrufen der Module:', error);
        res.status(500).send('Serverfehler');
    }
});

// Modul erstellen
router.post('/', async (req, res) => {
    const { title, content } = req.body;
    const query = 'INSERT INTO modules (title, content) VALUES (?, ?)';
    try {
        await connection.query(query, [title, content]);
        res.status(201).send('Modul erstellt');
    } catch (error) {
        console.error('Fehler beim Erstellen des Moduls:', error);
        res.status(500).send('Serverfehler');
    }
});

module.exports = router;
