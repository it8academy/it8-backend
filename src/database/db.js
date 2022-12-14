const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");


// fix can't add new command when connection is in closed state

let connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT,
  connectionLimit: 10,
  
});

// fix can't add new command when connection is in closed state
connection.connect(function (err) { 
  if (err) throw err;
  console.log("Connected!");
});

// fix can't add new command when connection is in closed state
connection.on('error', function (err) { // this ensures a new connection will be created if the old one was disconnected
  console.log('[mysql error]', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    connection = mysql.createConnection(connection.config); // Recreate the connection, since the old one cannot be reused.
  } else {
    throw err;
  }
});

module.exports = connection.promise();