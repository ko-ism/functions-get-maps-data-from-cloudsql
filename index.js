// Imports the Google Cloud client library
'use strict';


/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.GetMapsData = async (req, res) => {
  console.log("*******************GetMapsData**********************");
  try {
    console.log(req.body.id);
    let data = await getDataById(1);
    res.status(200).send(data);
  } catch (e) {
    console.error(e.toString());
    res.status(200).send(`Err: ${e.toString()}`);
  }

};

const getDataById = async (id) => {
  let sql = `SELECT * FROM address_lists WHERE address_id='${id}'`;
  console.log(`[${session_id}] [getDataById] SQL: ${sql}`);
  let sqlFunction = require("./common/mysql");

  return new Promise((resolve, reject) => {
    sqlFunction.mysqlPool.query(sql, (err, result) => {
      if (err) {
        console.error(`getDataById -> sql error`);
        reject(new Error(err.toString()))
      } else {
        console.log(`[getDataById] data: ${JSON.stringify(result)}`);
        resolve(JSON.stringify(result));
      }
    });
  });
};