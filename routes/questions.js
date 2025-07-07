const express = require('express');
const router = express.Router();
const connection = require('../db/db');

// Fragen für ein Modul abrufen
router.get('/module/:moduleId', async (req, res) => {
    const { moduleId } = req.params;
    const query = `
        SELECT q.* FROM questions q
        JOIN module_questions mq ON q.question_id = mq.question_id
        WHERE mq.module_id = ?`;
    const [questions] = await connection.query(query, [moduleId]);
    res.json(questions);
});

// Frage hinzufügen
router.post('/', async (req, res) => {
    const { question_text, answer_type, correct_answer, feedback, module_id } = req.body;
    const query = 'INSERT INTO questions (question_text, answer_type, correct_answer, feedback, module_id) VALUES (?, ?, ?, ?, ?)';
    await connection.query(query, [question_text, answer_type, correct_answer, feedback, module_id]);
    res.status(201).send('Frage hinzugefügt');
});

module.exports = router;
