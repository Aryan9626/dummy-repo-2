// File: server.js
const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',  // Here, ensure you've added the correct password.
    database: 'bmi_db'  // Also make sure the database name matches exactly.
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

app.post('/bmi', (req, res) => {
    const { name, weight, height } = req.body;
    const bmi = weight / (height * height);
    const sql = `INSERT INTO Users (name, weight, height, bmi, date_of_entry) VALUES (?, ?, ?, ?, CURDATE())`;

    db.query(sql, [name, weight, height, bmi], (err, result) => {
        if (err) throw err;
        res.send({ id: result.insertId, name, weight, height, bmi });
    });
});

app.get('/user/:id', (req, res) => {
    const sql = 'SELECT * FROM Users WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
