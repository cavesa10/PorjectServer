const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

// Crea una nueva tarea
exports.crearTarea = async (req, res) => {
  // Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // Extraer el proyecto y comprobar si existe
  try {
    const { proyecto } = req.body;
    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(400).json({ msg: "Proyecto no encontrado" });
    }

    // revisar si el proyecto actual pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    // Creamos la tarea
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un ero");
  }
};

// Obtiene las tareas del proyecto

exports.obtenerTareas = async (req, res) => {
  // Extraemos el proyecto
  try {
    const { proyecto } = req.body;
    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(400).json({ msg: "Proyecto no encontrado" });
    }
    // revisar si el proyecto actual pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }
    const tareas = await Tarea.find({ proyecto });
    res.json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// Actualizar una tarea
exports.actualizarTarea = async (req, res) => {
  // Extraemos el proyecto
  try {
    // Extraer proyecto
    const { proyecto, nombre, estado } = req.body;

    // Si la tarea existe o no
    let tareaExiste = await Tarea.findById(req.params.id);
    if (!tareaExiste) {
      return res.status(404).json({ msg: "No existe esa tarea" });
    }

    // revisar si el proyecto actual pertenece al usuario autenticado
    const existeProyecto = await Proyecto.findById(proyecto);
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    // Crear un objeto con la nueva información
    const nuevaTarea = {};

    if (nombre) nuevaTarea.nombre = nombre;
    console.log(estado);

    if (estado != undefined) {
      nuevaTarea.estado = estado;
    }

    // Guardar la tarea
    tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {
      new: true,
    });
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.eliminarTarea = async (req, res) => {
  // Extraemos el proyecto
  try {
    // Extraer proyecto
    const { proyecto } = req.body;

    // Si la tarea existe o no
    let tareaExiste = await Tarea.findById(req.params.id);
    if (!tareaExiste) {
      return res.status(404).json({ msg: "No existe esa tarea" });
    }
    // Extraer proyecto
    const existeProyecto = await Proyecto.findById(proyecto);
    // revisar si el proyecto actual pertenece al usuario autenticado
    console.log(existeProyecto, proyecto);
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }
    // Eliminar
    await Tarea.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Tarea Elminada" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
