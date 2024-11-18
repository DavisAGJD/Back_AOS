const express = require("express");
const router = express.Router();
const carritoController = require("../Controllers/CarritoController");
const { verificarToken } = require("../middleware/authMiddleware");

router.get("/:usuario_id", verificarToken,  carritoController.getCarritoByUsuario);
router.post("/", carritoController.postProductoACarrito);
router.put("/:usuario_id/:producto_id", carritoController.putCarrito)
router.delete("/:usuario_id/:producto_id", carritoController.deleteProductoCarrito);

module.exports = router