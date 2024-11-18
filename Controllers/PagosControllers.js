const db = require("../db");

const getPagos = (req, res) => {
  const query = "SELECT * FROM pagos";

  db.query(query, (err, results) => {
    if (err) {
      console.error(`Ocurrio un error: ${err}`);
      res.status(500).json({ error: "error al obtener los datos" });
    }
    res.json(results);
  });
};

const postPagos = (req, res) => {
  const { pedido_id, metodo_pago, estado_pago } = req.body;

  const query =
    "INSERT INTO pagos (pedido_id, metodo_pago, estado_pago) VALUES (?,?,?)";

  db.query(query, [pedido_id, metodo_pago, estado_pago], (err, results) => {
    if (err) {
      console.error(`Ocurrio un error: ${err}`);
      res.status(500).json({ error: "Error al insertar datos" });
    }

    res.status(201).json({
      message: "Pago agregado correctamente resultados:",
      results: results,
    });
  });
};

const putPagos = (req, res) => {
  const pago_id = req.params.id;

  const { pedido_id, metodo_pago, estado_pago } = req.body;

  const query =
    "UPDATE pagos SET pedido_id = ?, metodo_pago = ?, estado_pago = ? WHERE pago_id = ?";

  db.query(
    query,
    [pedido_id, metodo_pago, estado_pago, pago_id],
    (err, results) => {
      if (err) {
        console.error(`Ocurrio un error: ${err}`);
        res.status(500).json({ error: "Error al insertar datos" });
      }

      res.status(201).json({
        message: "Tu pago a sido actualizado correctamente resultados:",
        results: results,
      });
    }
  );
};

const deletePagos = (req, res) => {
  const pago_id = req.params.id;

  const query = "DELETE FROM pagos WHERE pago_id = ?";

  db.query(query, [pago_id], (err, results) => {
    if (err) {
      console.error(`Ocurrio un error: ${err}`);
      res.status(500).json({ error: "Error al eliminar datos" });
    }

    res.status(201).json({
      message: "Tu pago se ha eliminado correctamente. resultados",
      results: results,
    });
  });
};
module.exports = {
  getPagos,
  postPagos,
  putPagos,
  deletePagos
};
