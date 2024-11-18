const db = require("../db");

const getDetallesPedidos = (req, res) => {
  const query = "SELECT * FROM detalles_pedidos";

  db.query(query, (err, results) => {
    if (err) {
      console.error(`Ocurrio un error: ${err}`);
      res.status(500).json({ error: "error al obtener los datos" });
    }
    res.json(results);
  });
};

const postDetallesPedidos = (req, res) => {
  const { pedido_id, producto_id, cantidad, precio_unitario } = req.body;

  const query =
    "INSERT INTO detalles_pedidos (pedido_id, producto_id, cantidad, precio_unitario) VALUES (?,?,?,?)";

  db.query(
    query,
    [pedido_id, producto_id, cantidad, precio_unitario],
    (err, results) => {
      if (err) {
        console.error(`Ocurrio un error: ${err}`);
        res.status(500).json({ error: "Error al insertar datos" });
      }

      res.status(201).json({
        message: "Detalles de tu pedido agregados correctamente resultados:",
        results: results,
      });
    }
  );
};
const putDetallesPedidos = (req, res) => {
  const detalle_id = req.params.id;

  const { pedido_id, producto_id, cantidad, precio_unitario } = req.body;

  const query =
    "UPDATE detalles_pedidos SET pedido_id = ?, producto_id = ?, cantidad = ?, precio_unitario = ? WHERE detalle_id = ?";

  db.query(
    query,
    [pedido_id, producto_id, cantidad, precio_unitario, detalle_id],
    (err, results) => {
      if (err) {
        console.error(`Ocurrio un error: ${err}`);
        res.status(500).json({ error: "Error al insertar datos" });
      }

      res.status(201).json({
        message:
          "Los detalles de tu pedido han sido actualizados correctamente resultados:",
        results: results,
      });
    }
  );
};

const deleteDetallesPedidos = (req, res) => {
    const detalle_id = req.params.id;

    const query = "DELETE FROM detalles_pedidos WHERE detalle_id = ?"

    db.query(query, [detalle_id], (err, results) => {
        if (err) {
          console.error(`Ocurrio un error: ${err}`);
          res.status(500).json({ error: "Error al eliminar datos" });
        }
    
        res.status(201).json({
          message: "Detalles de tu pedido eliminados correctamente. resultados",
          results: results,
        });
      });
}

module.exports = {
  getDetallesPedidos,
  postDetallesPedidos,
  putDetallesPedidos,
  deleteDetallesPedidos
};
