const express = require('express');
const bodyParser = require('body-parser');
//const cors = require('cors');
const db = require('./db.js'); // importas la conexión

const app = express();
const PORT = 3000;

// Middlewares
//app.use(cors());
app.use(bodyParser.json());

// Rutas ejemplo
app.get('/material', (req, res) => {
    db.query('SELECT * FROM material', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:${PORT}");
});