const mysql = require("mysql");
const constantFun = require("./constants");

const mysqlConfig = {
  connectionLimit: 100,
  acquireTimeout: 10000,
  waitForConnections: true,
  queueLimit: 0,
  user: constantFun.constants.DB_USER,
  password: constantFun.constants.DB_PASSWORD,
  database: constantFun.constants.DB_NAME_DATABASE,
  socketPath: `/cloudsql/${constantFun.constants.DB_CONNECTION_NAME}`
};
let pool = mysql.createPool(mysqlConfig);
pool.on('release', (connection) => {
  console.log(`Connection ${connection.threadId} released`);
});
pool.on('connection', (connection) => {
  console.log(`Connection ${connection.threadId}`);
});
exports.createConnection = (session_id) => {
  console.log(`[${session_id}] **********************createConnection******************************`);
  // pool = mysql.createPool(mysqlConfig);
};
exports.mysqlPool = pool;
exports.endConnection = (session_id) => {
  console.log(`[${session_id}] **********************endConnection******************************`);
  // pool.end(function (err) {
  //   if (err) {
  //     console.log(`End Connection Err: ${err.toString()}`);
  //   } else {
  //     console.log(`End Connection Done!`);
  //   }
  // });
};