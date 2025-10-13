import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",      
  user: "alumno",           
  password: "alumno",
  database: "biblioteca"   
});

connection.connect(err => {
  if (err) {
    console.error("Error al conectar:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

connection.query("SELECT * FROM material", (err, results) => {
  if (err) throw err;
  console.log(results);
});

connection.end();