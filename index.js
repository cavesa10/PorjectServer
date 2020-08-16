const express = require("express");
const conectarDB = require("./config/db");

// crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();

// Habilitar express.json
app.use(express.json({ extended: true }));

// Puerto de la app
const PORT = process.env.PORT || 4000;

// importar Rutas
app.use("/api/usuarios", require("./routes/usuarios"));

// Arrancar la app
app.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto ${PORT}`);
});
