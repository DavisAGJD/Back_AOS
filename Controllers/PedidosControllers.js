const db = require("../db");

const getPedidos = (req, res) => {
  const query = "SELECT * FROM pedidos";

  db.query(query, (err, results) => {
    if (err) {
      console.error(`Ocurrio un error: ${err}`);
      res.status(500).json({ error: "error al obtener los datos" });
    }
    res.json(results);
  });
};

const postPedidos = (req, res) => {
  const { usuario_id, total, estado } = req.body;

  const query =
    "INSERT INTO pedidos (usuario_id, total, estado) VALUES (?,?,?)";

  db.query(query, [usuario_id, total, estado], (err, results) => {
    if (err) {
      console.error(`Ocurrio un error: ${err}`);
      res.status(500).json({ error: "Error al insertar datos" });
    }

    res.status(201).json({
      message: "Pedido agregado correctamente resultados:",
      results: results,
    });
  });
};

const putPedidos = (req, res) => {
  const pedido_id = req.params.id;

  const { usuario_id, total, estado } = req.body;

  const query =
    "UPDATE pedidos SET usuario_id = ?, total = ?, estado = ? WHERE pedido_id = ?";

  db.query(query, [usuario_id, total, estado, pedido_id], (err, results) => {
    if (err) {
      console.error(`Ocurrio un error: ${err}`);
      res.status(500).json({ error: "Error al insertar datos" });
    }

    res.status(201).json({
      message: "Pedido Actualizado correctamente resultados:",
      results: results,
    });
  });
};

const deletePedidos = (req, res) => {
  const pedido_id = req.params.id;

  const query = "DELETE FROM pedidos WHERE pedido_id = ?";

  db.query(query, [pedido_id], (err, results) => {
    if (err) {
      console.error(`Ocurrio un error: ${err}`);
      res.status(500).json({ error: "Error al eliminar datos" });
    }

    res.status(201).json({
      message: "Pedido eliminado correctamente. resultados",
      results: results,
    });
  });
};

module.exports = {
  getPedidos,
  postPedidos,
  putPedidos,
  deletePedidos
};
