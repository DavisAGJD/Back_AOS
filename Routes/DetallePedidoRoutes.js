const express = require("express");
const router = express.Router();
const detallePedidoController = require("../Controllers/DetallePedidoController");

router.get("/", detallePedidoController.getDetallesPedidos);
router.post("/", detallePedidoController.postDetallesPedidos);
router.put("/:id", detallePedidoController.putDetallesPedidos);
router.delete("/:id", detallePedidoController.deleteDetallesPedidos);

module.exports = router;