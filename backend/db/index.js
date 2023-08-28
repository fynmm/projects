const mysql = require('mysql');
const db = mysql.createPool({
  host:'127.0.0.1',
  user:'root',
  password: '974800149',
  database: 'RUNOOB',
})

// db.query(`CREATE TABLE IF NOT EXISTS users(
//   id INT NOT NULL AUTO_INCREMENT,
//   username VARCHAR(100) NOT NULL,
//   password VARCHAR(100) NOT NULL,
//   PRIMARY KEY ( id )
// );`,(err ,results) => {
//   if (err) return console.log(err);
//   return results
// })


module.exports = db;