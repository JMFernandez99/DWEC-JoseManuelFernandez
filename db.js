// db.js
import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "alumno",
  password: "alumno",
  database: "biblioteca"
});

db.connect(err => {
  if (err) {
    console.error("❌ Error al conectar:", err);
  } else {
    console.log("✅ Conectado a la base de datos MySQL");
  }
});

export default db;

// Esto básicamente es un canal entre Node y MySQL, es un módulo de conexión, el puente
// entre la aplicación en Node y la Base de Datos en MySQL