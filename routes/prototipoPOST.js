// POST creado por Ferrán

application.post(`/persona`, async (req, res, next) => {
    try {
        const {nom, dni, tipus} = req.body;
        if (!nom || !dni || !tipus) {
            const error = new Error('Faltan datos requeridos');
            error.status = 400;
            return next(error);
        }
        const [db_response] = await createPool.query(
            query_insert_persona,
            [nom, dni, tipus]);
        if (db_response.affectedRows === 0) {
            const error = new Error('No se ha podido añadir a la persona a la base de datos.')
            error.status = 500;
            return next(error);
        }
        res.status(201)
            .location(`/persona/${db_response.insertId}`)
            .json({ ok: true, message: 'Persona dada de alta en el sistema correctamente.'});
    } catch (err) {
        console.error('POST Persona: Error inesperat', err);
        next(err); //Pasar el error al siguiente middleware de errores
    }
});

// Middleware de errores(respuestas coherentes) creado por Ferrán
app.use((err, req, res, next) => {
    console.error(err);
    res
        .status(500)
        .json({
            ok: false,
            error: 'Error interno del servidor',
            detail: process.env.NODE_ENV === 'production' ? undefined : err.message
        });
});