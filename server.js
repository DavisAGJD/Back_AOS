const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const multer = require("multer");
const path = require("path");
require('dotenv').config();

app.use(express.json());

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre único para evitar conflictos
  },
});

const storagePerfiles = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/perfiles/"); // Carpeta para fotos de perfil
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renombra la imagen con la fecha actual
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no permitido"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
const uploadPerfiles = multer({
  storage: storagePerfiles,
  fileFilter: fileFilter,
});

module.exports = { upload, uploadPerfiles };

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const categoriasRoutes = require("./Routes/CategoriasRoutes");
const usuariosRoutes = require("./Routes/UsuariosRoutes");
const productosRoutes = require("./Routes/ProductosRoutes");
const pedidosRoutes = require("./Routes/PedidosRoutes");
const detallesPedidosRoutes = require("./Routes/DetallePedidoRoutes");
const pagosRoutes = require("./Routes/PagosRoutes");
const carritoRoutes = require("./Routes/CarritoRoutes");

app.use("/categorias", categoriasRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/productos", productosRoutes);
app.use("/pedidos", pedidosRoutes);
app.use("/detalle_pedidos", detallesPedidosRoutes);
app.use("/pagos", pagosRoutes);
app.use("/carrito", carritoRoutes);
app.use("/uploads", express.static("uploads")); // Sirve las imágenes desde la carpeta "uploads"

app.listen(port, () => {
  console.log(`Servidor prendido desde http://localhost:${port}`);
});
