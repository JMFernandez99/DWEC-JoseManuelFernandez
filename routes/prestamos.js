import express from "express";
import db from "../db.js";

const router = express.Router();

// -------------------- GET --------------------

// GET - Obtener todos los préstamos
router.get("/", (req, res) => {
  const sql = `
    SELECT p.ID_prestamo, s.nombre AS socio, a.nombre AS admin, m.titulo, 
           p.Fecha_prestamo, p.Fecha_devolucion
    FROM Prestamo p
    JOIN Persona s ON p.ID_socio = s.ID
    JOIN Persona a ON p.ID_admin = a.ID
    JOIN material m ON p.ID_material = m.ID;
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ mensaje: "No hay préstamos registrados." });
    res.json(results);
  });
});

// GET - Obtener préstamos pendientes de devolución

router.get("/pendientes", (req, res) => {
  const sql = `
    SELECT 
      p.ID_prestamo, 
      s.nombre AS socio, 
      a.nombre AS admin, 
      m.titulo, 
      p.Fecha_prestamo
    FROM Prestamo p
    JOIN Persona s ON p.ID_socio = s.ID
    JOIN Persona a ON p.ID_admin = a.ID
    JOIN material m ON p.ID_material = m.ID
    WHERE p.Fecha_devolucion IS NULL;
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({
        mensaje: "No hay préstamos pendientes de devolución.",
      });
    }

    res.json(results);
  });
});

// GET - Obtener préstamos ya devueltos

router.get("/devueltos", (req, res) => {
  const sql = `
    SELECT 
      p.ID_prestamo, 
      s.nombre AS socio, 
      a.nombre AS admin, 
      m.titulo, 
      p.Fecha_prestamo, 
      p.Fecha_devolucion
    FROM Prestamo p
    JOIN Persona s ON p.ID_socio = s.ID
    JOIN Persona a ON p.ID_admin = a.ID
    JOIN material m ON p.ID_material = m.ID
    WHERE p.Fecha_devolucion IS NOT NULL;
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({
        mensaje: "No hay préstamos devueltos.",
      });
    }

    res.json(results);
  });
});

// -------------------- POST --------------------

// POST - Crear un nuevo préstamo
router.post("/", (req, res) => {
  const { ID_socio, ID_admin, ID_material, Fecha_prestamo } = req.body;

  if (!ID_socio || !ID_admin || !ID_material || !Fecha_prestamo) {
    return res.status(400).json({ 
      error: "Los campos ID_socio, ID_admin, ID_material y Fecha_prestamo son obligatorios."
    });
  }

  const sql = `
    INSERT INTO Prestamo (ID_socio, ID_admin, ID_material, Fecha_prestamo)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [ID_socio, ID_admin, ID_material, Fecha_prestamo], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ 
      mensaje: "Préstamo creado correctamente.", 
      ID_prestamo: result.insertId 
    });
  });
});


// -------------------- PUT --------------------

// PUT - Registrar una devolución
router.put("/:id/devolver", (req, res) => {
  const { id } = req.params;
  const { Fecha_devolucion } = req.body;

  if (!Fecha_devolucion)
    return res.status(400).json({ error: "El campo 'Fecha_devolucion' es obligatorio." });

  const sql = `
    UPDATE Prestamo 
    SET Fecha_devolucion = ? 
    WHERE ID_prestamo = ?
  `;

  db.query(sql, [Fecha_devolucion, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ mensaje: "Préstamo no encontrado." });

    res.json({ mensaje: "Devolución registrada correctamente." });
  });
});

export default router;
