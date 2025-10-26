import express from "express";
import db from "../db.js";

const router = express.Router();

// ------------- GET -------------

// GET - Obtener todas las personas

router.get("/", (req, res) => {
    const sql = `SELECT ID, nombre, DNI, tipo, rol_admin FROM Persona;`;

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(404).json({ mensaje: "No hay personas registradas."});
        }

        res.json(results);
    });
});

// GET - Obetener una persona según tipo

router.get("/:tipo", (req, res) => {
  const { tipo } = req.params;
  const tipoMayus = tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase();

  if (tipoMayus !== "Socio" && tipoMayus !== "Administrador") {
    return res.status(400).json({ error: "Tipo no válido. Usa 'socio' o 'administrador'." });
  }

  const sql = `SELECT ID, nombre, DNI, tipo, rol_admin FROM Persona WHERE tipo = ?;`;

  db.query(sql, [tipoMayus], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ mensaje: `No hay personas del tipo ${tipoMayus}.` });
    }

    res.json(results);
  });
});

// ------------- POST -------------


// POST - Añadir una nueva persona

router.post("/", (req, res) => {
    const { nombre, DNI, tipo, rol_admin } = req.body;
    const tipoMayus = tipo?.charAt(0).toUpperCase() + tipo?.slice(1).toLowerCase();

    if (!nombre) return res.status(400).json({ error: "El campo 'nombre' es obligatorio" });
    if (!DNI) return res.status(400).json({ error: "El campo 'DNI' es obligatorio" });
    if (!tipo || (tipoMayus !== "Socio" && tipoMayus !== "Administrador")) {
        return res.status(400).json({ error: "El campo 'tipo' debe ser 'Socio' o 'Administrador'." });
    }
    if (tipoMayus === "Administrador" && !rol_admin) {
        return res.status(400).json({ error: "El campo 'rol_admin' es obligatorio para administradores." });
    }

    const sql = `INSERT INTO Persona (nombre, DNI, tipo, rol_admin) VALUES (?, ?, ?, ?)`;
    const params = [nombre, DNI, tipoMayus, tipoMayus === "Administrador" ? rol_admin : null];

    db.query(sql, params, (err, result) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(400).json({ error: "El DNI ya está registrado." });
            }
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({ mensaje: `${tipoMayus} creado correctamente.`, ID: result.insertId });
    });
});

export default router;