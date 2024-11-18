const db = require("../db");

const getCarritoByUsuario = (req, res) => {
  const usuario_id = req.params.usuario_id;

  const query = `
    SELECT c.producto_id, p.nombre, p.precio, p.imagen_url, c.cantidad 
    FROM carrito c
    JOIN productos p ON c.producto_id = p.producto_id
    WHERE c.usuario_id = ?
  `;

  db.query(query, [usuario_id], (err, results) => {
    if (err) {
      console.error(`Ocurrió un error: ${err}`);
      return res.status(500).json({ error: "Error al obtener el carrito" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Carrito vacío" });
    }

    res.json(results);
  });
};

const postProductoACarrito = (req, res) => {
  const { usuario_id, producto_id, cantidad } = req.body;

  const query = `INSERT INTO carrito (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)`;

  db.query(query, [usuario_id, producto_id, cantidad], (err, results) => {
    if (err) {
      console.error(`Ocurrio un error: ${err}`);
      res.status(500).json({ error: "Error al insertar producto al carrito" });
    }

    res.status(201).json({
      message: "Producto agregado correctamente",
      results: results,
    });
  });
};

const putCarrito = (req, res) => {
  const { usuario_id, producto_id } = req.params;
  const { cantidad } = req.body;

  const query = `UPDATE carrito SET cantidad = ? WHERE usuario_id = ? AND producto_id = ?`;

  db.query(query, [cantidad, usuario_id, producto_id], (err, results) => {
    if (err) {
      console.error(`Ocurrio un error: ${err}`);
      res.status(500).json({ error: "Error al actualizar el carrito" });
    }

    res.status(201).json({
      message: "Actualizado el carrito con exito",
      results: results,
    });
  });
};

const deleteProductoCarrito = (req, res) => {
  const { usuario_id, producto_id } = req.params;

  const query = `DELETE FROM carrito WHERE usuario_id = ? AND producto_id = ?`;

  db.query(query, [usuario_id, producto_id], (err, results) => {
    if (err) {
      console.error(`Ocurrio un error: ${err}`);
      res
        .status(500)
        .json({ error: "Error al eliminar el producto del carrito" });
    }

    res.status(201).json({
      message: "Producto eliminao del carrito exitosamente",
      results: results,
    });
  });
};

module.exports = {
  getCarritoByUsuario,
  postProductoACarrito,
  putCarrito,
  deleteProductoCarrito,
};
