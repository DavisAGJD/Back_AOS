const express = require("express");
const router = express.Router();
const productosController = require("../Controllers/ProductosController");
const { upload } = require("../server");


router.get("/", productosController.getProductos);
router.get("/:producto_id", productosController.getProductosByID);
router.get("/categoria/:categoria_id", productosController.getProductosByCategoria);
router.post('/', upload.single('imagen'), productosController.postProductos);
router.put('/:id', upload.single('imagen'), productosController.putProductos);
router.delete("/:id", productosController.deleteProductos);

module.exports = router;