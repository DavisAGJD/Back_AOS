const express = require("express");
const router = express.Router();
const pagosController = require("../Controllers/PagosControllers");

router.get("/", pagosController.getPagos);
router.post("/", pagosController.postPagos);
router.put("/:id", pagosController.putPagos);
router.delete("/:id", pagosController.deletePagos);

module.exports = router