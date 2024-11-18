const db = require("../db");
const { upload } = require("../server");
const fs = require("fs");
const path = require("path");

const getProductos = (req, res) => {
  const query = `
    SELECT p.producto_id, p.nombre AS producto_nombre, p.descripcion, p.precio, p.stock, p.imagen_url, c.nombre AS categoria_nombre
    FROM productos p
    JOIN categorias c ON p.categoria_id = c.categoria_id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(`Ocurrio un error: ${err}`);
      return res.status(500).json({ error: "Error al obtener los datos" });
    }
    res.json(results);
  });
};

const getProductosByID = (req, res) => {
  const { producto_id } = req.params;

  const query = `SELECT * FROM productos WHERE producto_id = ? `;

  db.query(query, [producto_id], (err, results) => {
    if (err) {
      console.error(`Ocurrio un error: ${err}`);
      return res.status(500).json({ error: "Error al obtener los datos" });
    }
    res.json(results);
  });
};

const getProductosByCategoria = (req, res) => {
  const { categoria_id } = req.params;

  const query = `SELECT * FROM productos WHERE categoria_id = ?`;

  db.query(query, [categoria_id], (err, results) => {
    if (err) {
      console.error(`Ocurrio un error: ${err}`);
      return res.status(500).json({ error: "Error al obtener los datos" });
    }
    res.json(results);
  });
};

// Manejar la subida de archivos para productos
const postProductos = (req, res) => {
  const { nombre, descripcion, precio, stock, categoria_id } = req.body;
  const imagen_url = req.file ? `/uploads/${req.file.filename}` : null; // Si no se sube imagen, será null

  const query =
    "INSERT INTO productos (nombre, descripcion, precio, stock, imagen_url, categoria_id) VALUES (?,?,?,?,?,?)";

  db.query(
    query,
    [nombre, descripcion, precio, stock, imagen_url, categoria_id],
    (err, results) => {
      if (err) {
        console.error(`Ocurrió un error: ${err}`);
        return res.status(500).json({ error: "Error al insertar datos" });
      }

      res.status(201).json({
        message: "Producto agregado correctamente",
        results: results,
      });
    }
  );
};

const putProductos = (req, res) => {
  const producto_id = req.params.id;
  const { nombre, descripcion, precio, stock, categoria_id } = req.body;

  // Primero obtenemos la URL de la imagen actual del producto
  const selectQuery = "SELECT imagen_url FROM productos WHERE producto_id = ?";

  db.query(selectQuery, [producto_id], (err, results) => {
    if (err) {
      console.error(`Ocurrió un error al obtener el producto: ${err}`);
      return res.status(500).json({ error: "Error al obtener los datos" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const imagenActualUrl = results[0].imagen_url;

    // Si se sube una nueva imagen, construimos la nueva URL, de lo contrario mantenemos la imagen existente
    const imagen_url = req.file
      ? `/uploads/${req.file.filename}`
      : imagenActualUrl;

    // Si se sube una nueva imagen, eliminamos la imagen anterior
    if (req.file && imagenActualUrl) {
      const imagenPath = path.join(__dirname, "..", imagenActualUrl);
      fs.unlink(imagenPath, (unlinkErr) => {
        if (unlinkErr) {
          console.error(`Error al eliminar la imagen anterior: ${unlinkErr}`);
        } else {
          console.log("Imagen anterior eliminada correctamente");
        }
      });
    }

    // Actualizamos el producto con la nueva información
    const updateQuery = `
      UPDATE productos 
      SET nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen_url = ?, categoria_id = ? 
      WHERE producto_id = ?
    `;

    db.query(
      updateQuery,
      [
        nombre,
        descripcion,
        precio,
        stock,
        imagen_url,
        categoria_id,
        producto_id,
      ],
      (updateErr, updateResults) => {
        if (updateErr) {
          console.error(
            `Ocurrió un error al actualizar el producto: ${updateErr}`
          );
          return res
            .status(500)
            .json({ error: "Error al actualizar los datos" });
        }

        if (updateResults.affectedRows === 0) {
          return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.status(200).json({
          message: "Producto actualizado correctamente",
          results: updateResults,
        });
      }
    );
  });
};

const deleteProductos = (req, res) => {
  const producto_id = req.params.id;

  // Primero obtenemos el producto para tener la URL de la imagen
  const selectQuery = "SELECT imagen_url FROM productos WHERE producto_id = ?";

  db.query(selectQuery, [producto_id], (err, results) => {
    if (err) {
      console.error(`Ocurrió un error al obtener el producto: ${err}`);
      return res.status(500).json({ error: "Error al obtener los datos" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const imagenPath = path.join(__dirname, "..", results[0].imagen_url);

    // Elimina la imagen del servidor
    fs.unlink(imagenPath, (unlinkErr) => {
      if (unlinkErr) {
        console.error(`Ocurrió un error al eliminar la imagen: ${unlinkErr}`);
        // Si la imagen no se puede eliminar, continuamos para eliminar el producto
      }

      // Después de intentar eliminar la imagen, eliminamos el producto de la base de datos
      const deleteQuery = "DELETE FROM productos WHERE producto_id = ?";

      db.query(deleteQuery, [producto_id], (deleteErr) => {
        if (deleteErr) {
          console.error(
            `Ocurrió un error al eliminar el producto: ${deleteErr}`
          );
          return res.status(500).json({ error: "Error al eliminar los datos" });
        }

        res.status(200).json({
          message:
            "Producto eliminado correctamente junto con la imagen asociada.",
        });
      });
    });
  });
};

module.exports = {
  getProductos,
  getProductosByID,
  getProductosByCategoria,
  postProductos,
  putProductos,
  deleteProductos,
};
