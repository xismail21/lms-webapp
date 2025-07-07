const mysql = require('mysql2');

// Konfiguration der Datenbankverbindung
const connection = mysql.createConnection({
    host: 'localhost',      // Der Hostname der Datenbank
    user: 'root',           // Dein Datenbank-Benutzername
    password: '',           // Dein Datenbank-Passwort
    database: 'Lern'       // Der Name der Datenbank
});

// Verbindung zur Datenbank herstellen
connection.connect((err) => {
    if (err) {
        console.error('Fehler bei der Verbindung zur Datenbank: ' + err.stack);
        return;
    }
    console.log('Verbunden als ID ' + connection.threadId);
});

// Exportiere die Verbindung für die Verwendung in anderen Modulen
module.exports = connection;
