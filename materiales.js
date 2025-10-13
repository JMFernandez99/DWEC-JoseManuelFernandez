// GET
app.get('/materiales', (req, res) => {
    db.query('SELECT * FROM material', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// POST
app.post('/materiales', (req, res) => {
    const {tipo, ejemplares, titulo}  = req.body;
    db.query("INSERT INTO material (tipo, ejemplares, titulo) VALUES(?, ?, ?)", [tipo, ejemplares, titulo], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// PUT
app.put('/materiales/:id', (req, res) => {
    const { tipo, ejemplares, titulo } = req.body;
    const { id } = req.params;
    db.query(
        "UPDATE material SET tipo = ?, ejemplares = ?, titulo = ? WHERE ID = ?",
        [tipo, ejemplares, titulo, id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        }
    );
});