const Usuario = require('../models/Usuario')

exports.crearUsuario = async(req, res) => {
  try {
    let usuario

    // Crear el nuevo usuario
    usuario = new Usuario(req.body);

    // Guardar usuario
    await usuario.save()

    // Mensaje de confirmacion
    res.send('Usuario Creado correctamente')
  } catch (error) {
    console.log(error)
    res.status(400).send('Hubo un error')
  }
}