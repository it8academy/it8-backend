const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

let connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT,
  // multipleStatements: true,
  connectionLimit: 10,
  // connectTimeout: 10000,
  // debug: true,
  // trace: true,
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database");
});

module.exports = connection.promise();
