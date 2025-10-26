import express from "express";
import db from "../db.js";

const router = express.Router();

// ---------------- GET ----------------

// GET - Obtener todos los materiales
router.get("/", (req, res) => {
  const sql = `SELECT ID, titulo, ejemplares, Tipo FROM material;`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET - Obtener un material por tipo
router.get("/:tipo", (req, res) => {
  const { tipo } = req.params;
  const tipoMayus = tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase();

  let sql = "";
  let params = [];

  switch (tipoMayus) {
    case "Libro":
      sql = `SELECT m.ID, m.titulo, m.ejemplares, l.autor
             FROM material AS m
             JOIN Libro AS l ON m.ID = l.ID_material
             WHERE m.Tipo = ?;`;
      params = ["Libro"];
      break;
    case "Revista":
      sql = `SELECT m.ID, m.titulo, m.ejemplares, r.autor, r.fecha_publicacion
             FROM material AS m
             JOIN Revista AS r ON m.ID = r.ID_material
             WHERE m.Tipo = ?;`;
      params = ["Revista"];
      break;
    case "Pelicula":
      sql = `SELECT m.ID, m.titulo, m.ejemplares, p.director, p.genero
             FROM material AS m
             JOIN Pelicula AS p ON m.ID = p.ID_material
             WHERE m.Tipo = ?;`;
      params = ["Pelicula"];
      break;
    default:
      return res.status(400).json({ error: "Tipo de material no válido" });
  }

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ mensaje: `No se encontraron ${tipoMayus}s.` });
    res.json(results);
  });
});

// ---------------- POST ----------------

// POST - Añadir materiales introduciendo primero el tipo y después el resto de datos en json
router.post("/:tipo", (req, res) => {
  const { tipo } = req.params;
  const tipoMayus = tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase();
  const { titulo, ejemplares } = req.body;

  if (!titulo) return res.status(400).json({ error: "El campo 'titulo' es obligatorio" });
  const ej = ejemplares || 1;

  const sqlMaterial = `INSERT INTO material (Tipo, titulo, ejemplares) VALUES (?, ?, ?)`;
  db.query(sqlMaterial, [tipoMayus, titulo, ej], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    const idMaterial = result.insertId;
    let sqlTipo = "";
    let paramsTipo = [];

    switch (tipoMayus) {
      case "Libro":
        const { autor } = req.body;
        if (!autor) return res.status(400).json({ error: "El campo 'autor' es obligatorio para libros" });
        sqlTipo = `INSERT INTO Libro (ID_material, autor) VALUES (?, ?)`;
        paramsTipo = [idMaterial, autor];
        break;
      case "Revista":
        const { autor: autorR, fecha_publicacion } = req.body;
        if (!autorR || !fecha_publicacion)
          return res.status(400).json({ error: "Los campos 'autor' y 'fecha_publicacion' son obligatorios para revistas" });
        sqlTipo = `INSERT INTO Revista (ID_material, autor, fecha_publicacion) VALUES (?, ?, ?)`;
        paramsTipo = [idMaterial, autorR, fecha_publicacion];
        break;
      case "Pelicula":
        const { director, genero } = req.body;
        if (!director || !genero)
          return res.status(400).json({ error: "Los campos 'director' y 'genero' son obligatorios para peliculas" });
        sqlTipo = `INSERT INTO Pelicula (ID_material, director, genero) VALUES (?, ?, ?)`;
        paramsTipo = [idMaterial, director, genero];
        break;
      default:
        return res.status(400).json({ error: "Tipo de material no válido" });
    }

    db.query(sqlTipo, paramsTipo, (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.status(201).json({ mensaje: `${tipoMayus} creado correctamente`, ID: idMaterial });
    });
  });
});

// -------------- Exportar router --------------

export default router;