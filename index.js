// Imports the Google Cloud client library
'use strict';

const constantFun = require("./common/constants");


/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.GetMapsData = async (req, res) => {
  console.log("*******************GetMapsData**********************");
  let data = "";
  try {
    console.log(req.body.id);
    console.log(req.body.title);
    if (req.body.id != 0 && req.body.id != undefined) {
      data = await getDataById(req.body.id);
      console.log(data);
    } else if (req.body.title != '' && req.body.title != undefined) {
      data = await getDataByTitle(req.body.title);
      console.log(data);
    } else {
      data = "Error: No input";
      console.log(data);
    }
    

    res.setHeader('Access-Control-Allow-Origin', constantFun.constants.ALLOWED_ORIGINS);
    res.setHeader('Access-Control-Allow-Methods', constantFun.constants.ALLOWED_METHODS.join(','));
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Accept,X-Custom-Header');
    res.status(200).send(data);
    // res.json(todoList);
    console.log("Finished");
  } catch (e) {
    console.error(e.toString());
    
    res.setHeader('Access-Control-Allow-Origin', constantFun.constants.ALLOWED_ORIGINS);
    res.setHeader('Access-Control-Allow-Methods', constantFun.constants.ALLOWED_METHODS.join(','));
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Accept,X-Custom-Header');
    res.status(200).send(`Err: ${e.toString()}`);
    // res.send(`Err: ${e.toString()}`);
  }

};

const getDataById = async (id) => {
  let sql = `SELECT * FROM address_lists WHERE address_id='${id}'`;
  console.log(`[getDataById] SQL: ${sql}`);
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



const getDataByTitle = async (title) => {
  let sql = `SELECT * FROM address_lists WHERE title like '%${title}%'`;
  console.log(`[getDataById] SQL: ${sql}`);
  let sqlFunction = require("./common/mysql");

  return new Promise((resolve, reject) => {
    sqlFunction.mysqlPool.query(sql, (err, result) => {
      if (err) {
        console.error(`getDataByTitle -> sql error`);
        reject(new Error(err.toString()))
      } else {
        console.log(`[getDataByTitle] data: ${JSON.stringify(result)}`);
        resolve(JSON.stringify(result));
      }
    });
  });
};