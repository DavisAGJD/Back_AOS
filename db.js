const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "D@v1d#Str@ng3r!8",
  database: "eccomerce_aos",
});

db.connect((err) => {
  if (err) {
    console.error(`Error al conectar la base de datos ${err}`);
    return;
  }
  console.log("Conectando a la base de datos");
});


module.exports = db;