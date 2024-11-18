const express = require("express");
const router = express.Router();
const pedidosController = require("../Controllers/PedidosControllers");
const { route } = require("./CategoriasRoutes");

router.get("/", pedidosController.getPedidos);
router.post("/", pedidosController.postPedidos);
router.put("/:id", pedidosController.putPedidos);
router.delete("/:id", pedidosController.deletePedidos);

module.exports = router;
