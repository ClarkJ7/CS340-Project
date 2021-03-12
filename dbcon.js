var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_clarkj7',
  password        : '0694',
  database        : 'cs340_clarkj7',
  multipleStatements: true
});

module.exports.pool = pool;