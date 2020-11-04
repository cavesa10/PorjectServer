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
const port = process.env.PORT || 80;

// importar Rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas.js"));

// Arrancar la app
app.listen(port, '0.0.0.0', () => {
  console.log(`El servidor está funcionando en el puerto ${port}`);
});

app.get('/',(req,res) => {
  res.send("This is a sample express app")
})