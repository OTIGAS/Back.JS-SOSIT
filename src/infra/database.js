require("dotenv").config();

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  multipleStatements: true,
  charset: "utf8mb4",
});

db.connect((erro) => {
  if (erro) {
    throw erro;
  }
  console.log(`Conectado com o banco de dados [${process.env.DB_NAME}]`);
});

global.db = db;
module.exports = db;
