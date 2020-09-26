const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // leer el tojen del header
  const token = req.header("x-auth-token");
  // Revisar si no hay token
  if (!token) {
    return res.status(401).json({ msj: "No hay token, permiso no valido" });
  }

  try {
    const cifrado = jwt.verify(token, process.env.SECRETA);
    req.usuario = cifrado.usuario;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token no Válido" });
  }
  // validar el token
};
