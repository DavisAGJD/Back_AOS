const express = require("express");
const router = express.Router();
const categoriaController = require("../Controllers/CategoriaControllers");

router.get("/", categoriaController.getCategorias);
router.get("/:categoria_id", categoriaController.getCategoriaId);
router.post("/", categoriaController.postCategorias);
router.put("/:id", categoriaController.putCategorias);
router.delete("/:id", categoriaController.deleteCategorias);



module.exports = router;
