const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "ifscfinder"
});

module.exports = connection;