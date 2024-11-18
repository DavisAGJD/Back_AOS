const db = require("../db");

const getCategorias = (req, res) => {
  const query = "SELECT * FROM categorias";

  db.query(query, (err, results) => {
    if (err) {
      console.error(`Ocurrio un error: ${err}`);
      res.status(500).json({ error: "error al obtener los datos" });
    }
    res.json(results);
  });
};

const getCategoriaId = (req, res) => {
  const { categoria_id } = req.params; 

  const query = "SELECT * FROM categorias WHERE categoria_id = ?";

  db.query(query, [categoria_id], (err, results) => {
    if (err) {
      console.error(`Ocurrió un error: ${err}`);
      return res.status(500).json({ error: "Error al obtener los datos" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Categoría no encontrada" }); 
    }

    res.json(results[0]); 
  });
};


const postCategorias = (req, res) => {
  const { nombre } = req.body;

  const query = "INSERT INTO categorias (nombre) VALUES (?)";

  db.query(query, [nombre], (err, results) => {
    if (err) {
      console.error(`Ocurrio un error: ${err}`);
      res.status(500).json({ error: "Error al insertar datos" });
    }

    res.status(201).json({
      message: "Categoria agregada correctamente resultados:",
      results: results,
    });
  });
};

const putCategorias = (req, res) => {
  const categoria_id = req.params.id;

  const { nombre } = req.body;

  const query = "UPDATE categorias SET nombre = ? WHERE categoria_id = ?";

  db.query(query, [nombre, categoria_id], (err, results) => {
    if (err) {
      console.error(`Ocurrio un error: ${err}`);
      res.status(500).json({ error: "Error al actualizar datos" });
    }

    res.status(201).json({
      message: "Categoria actualizada correctamente. resultados",
      results: results,
    });
  });
};

const deleteCategorias = (req, res) => {
  const categoria_id = req.params.id;

  const query = "DELETE FROM categorias WHERE categoria_id = ?";

  db.query(query, [categoria_id], (err, results) => {
    if (err) {
      console.error(`Ocurrio un error: ${err}`);
      res.status(500).json({ error: "Error al eliminar datos" });
    }

    res.status(201).json({
      message: "Categoria eliminada correctamente. resultados",
      results: results,
    });
  });
};

module.exports = {
  getCategorias,
  getCategoriaId,
  postCategorias,
  putCategorias,
  deleteCategorias
};
