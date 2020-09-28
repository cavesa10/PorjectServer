const express = require("express");
const router = express.Router();
const tareaController = require("../controllers/tareaController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

// crear proyectos
// api/tareas
router.post(
  "/",
  auth,
  [check("nombre", "El Nombre de la tarea es obligatorio").not().isEmpty()],
  [check("proyecto", "El Proyecto de la tarea es obligatorio").not().isEmpty()],
  tareaController.crearTarea
);

// obtener todos las tareas
router.get("/", auth, tareaController.obtenerTareas);

// Actualizar tareas via ID
router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre de la tarea es obligatorio").not().isEmpty()],
  tareaController.actualizarTarea
);

// // Eliminar un tarea
router.delete("/:id", auth, tareaController.eliminarTarea);

module.exports = router;
