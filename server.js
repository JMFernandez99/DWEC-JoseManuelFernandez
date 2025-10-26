import express from "express";
import bodyParser from "body-parser";
import materialRouter from "./routes/materiales.js"; // router de materiales
import personaRouter from "./routes/personas.js"; // router de personas
import prestamoRouter from "./routes/prestamos.js"; // router de prestamos

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Montar los routers
app.use("/material", materialRouter);
app.use("/persona", personaRouter);
app.use("/prestamo", prestamoRouter);

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});