const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getUsuarios = (req, res) => {
  const query = "SELECT * FROM usuarios";

  db.query(query, (err, results) => {
    if (err) {
      console.error(`Ocurrio un error: ${err}`);
      res.status(500).json({ error: "error al obtener los datos" });
    }
    res.json(results);
  });
};

const getInfoUsuarioById = (req, res) => {
  const usuario_id = parseInt(req.params.id, 10);

  if (isNaN(usuario_id)) {
    return res.status(400).json({ error: "ID de usuario inválido" });
  }

  const query = "SELECT usuario_id, nombre, email, foto_perfil, rol FROM usuarios WHERE usuario_id = ?";

  db.query(query, [usuario_id], (err, results) => {
    if (err) {
      console.error(`Ocurrió un error: ${err}`);
      return res.status(500).json({ error: "Error al obtener los datos" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(results[0]);
  });
};

module.exports = {
  getInfoUsuarioById,
};

const getFotoPerfil = (req, res) => {
  const usuario_id = req.params.id;
  const query = "SELECT foto_perfil FROM usuarios WHERE usuario_id = ?";

  db.query(query, [usuario_id], (err, results) => {
    if (err) {
      console.error(`Ocurrio un error: ${err}`);
      res.status(500).json({ error: "error al obtener los datos" });
    }
    res.json(results);
  });
};

const postUsuarios = async (req, res) => {
  const { nombre, email, contrasena } = req.body;
  const hashedPassword = await bcrypt.hash(contrasena, 10); // Hash de la contraseña

  const query =
    "INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)";

  db.query(query, [nombre, email, hashedPassword], (err, results) => {
    if (err) {
      console.error(`Ocurrió un error: ${err}`);
      return res.status(500).json({ error: "Error al registrar el usuario" });
    }

    res.status(201).json({
      message: "Usuario registrado correctamente.",
      results: results,
    });
  });
};

const login = (req, res) => {
  const { email, contrasena } = req.body;

  const query = "SELECT * FROM usuarios WHERE email = ?";

  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error(`Ocurrió un error: ${err}`);
      return res.status(500).json({ error: "Error al iniciar sesión" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(contrasena, user.contrasena);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.usuario_id, rol: user.rol },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.json({
      message: "Inicio de sesión exitoso",
      token: token,
    });
  });
};

const postFotoPerfil = (req, res) => {
  const usuario_id = req.params.id;
  const foto_perfil = `/uploads/perfiles/${req.file.filename}`; // Almacena la ruta en la base de datos

  const query = "UPDATE usuarios SET foto_perfil = ? WHERE usuario_id = ?";

  db.query(query, [foto_perfil, usuario_id], (err, results) => {
    if (err) {
      console.error(`Ocurrió un error: ${err}`);
      return res
        .status(500)
        .json({ error: "Error al actualizar la foto de perfil" });
    }

    res.status(201).json({
      message: "Foto de perfil actualizada correctamente.",
      results: results,
    });
  });
};

const putUsuarios = (req, res) => {
  const usuario_id = req.params.id;

  const { nombre, email, contrasena } = req.body;

  const query =
    "UPDATE usuarios SET nombre = ?, email = ?, contrasena = ? WHERE usuario_id = ?";

  db.query(query, [nombre, email, contrasena, usuario_id], (err, results) => {
    if (err) {
      console.error(`Ocurrio un error: ${err}`);
      res.status(500).json({ error: "Error al actualizar datos" });
    }

    res.status(201).json({
      message: "Usuario actualizada correctamente. resultados",
      results: results,
    });
  });
};

const deleteUsuarios = (req, res) => {
  const usuario_id = req.params.id;

  const query = "DELETE FROM usuarios WHERE usuario_id = ?";

  db.query(query, [usuario_id], (err, results) => {
    if (err) {
      console.error(`Ocurrio un error: ${err}`);
      res.status(500).json({ error: "Error al eliminar datos" });
    }

    res.status(201).json({
      message: "Usuario eliminado correctamente. resultados",
      results: results,
    });
  });
};

module.exports = {
  getUsuarios,
  getInfoUsuarioById,
  postUsuarios,
  login,
  putUsuarios,
  deleteUsuarios,
  postFotoPerfil,
  getFotoPerfil,
};
