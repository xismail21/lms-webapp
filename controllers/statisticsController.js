// controllers/statisticsController.js
const connection = require('../db/db'); // Verbindung zur Datenbank

exports.getStatistics = async (req, res) => {
    try {
        // Anzahl der Fragen abrufen
        const [totalQuestions] = await connection.query('SELECT COUNT(*) AS total_questions FROM Questions');
        
        // Anzahl der Benutzer abrufen
        const [totalUsers] = await connection.query('SELECT COUNT(*) AS total_users FROM Users');
        
        // Weitere Statistiken können hier hinzugefügt werden

        // Rückgabe der Statistiken als JSON
        res.json({
            total_questions: totalQuestions[0].total_questions,
            total_users: totalUsers[0].total_users
            // Hier weitere Statistiken hinzufügen, falls benötigt
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Fehler beim Abrufen der Statistiken');
    }
};
