const express = require("express");
const conectarDB = require("./config/db");
const cors = require('cors')

// crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();

// Habilitar Cors
app.use(cors())

// Habilitar express.json
app.use(express.json({ extended: true }));

// Puerto de la app
const port = process.env.port || 4000;
const host = '0.0.0.0'

// importar Rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas.js"));

// Arrancar la app
app.listen(port, host, () => {
  console.log(`El servidor está funcionando en el puerto ${port}`);
});
