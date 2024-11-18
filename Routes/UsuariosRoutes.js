const express = require("express");
const router = express.Router();
const usuariosController = require("../Controllers/UsuariosController");
const { uploadPerfiles } = require("../server");
const { verificarToken } = require("../middleware/authMiddleware");


router.get("/", usuariosController.getUsuarios);
router.get("/foto_perfil/:id", verificarToken, usuariosController.getFotoPerfil);
router.get("/info/:id", verificarToken, usuariosController.getInfoUsuarioById);
router.post("/", usuariosController.postUsuarios);
router.post("/login", usuariosController.login);
router.post('/:id/foto-perfil', uploadPerfiles.single('foto_perfil'), usuariosController.postFotoPerfil);
router.put("/:id", usuariosController.putUsuarios);
router.delete("/:id", usuariosController.deleteUsuarios)

module.exports = router