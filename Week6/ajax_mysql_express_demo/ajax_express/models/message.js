const db = require("./db.js");
const tableName = "message";
class Message {
  constructor(msg, time) {
    this.msg = msg;
    this.time = time;
  }
}
async function sync() {
  try {
    db.pool.query(`
       CREATE TABLE IF NOT EXISTS ${tableName} (
           msg VARCHAR(255),
           time DATETIME PRIMARY KEY
       )
       `);
  } catch (error) {
    console.error("database connection failed. " + error);
    throw error;
  }
}

async function all() {
  try {
    const [rows, fieldDefs] = await db.pool.query(`
            SELECT msg, time FROM ${tableName}
        `);
    var list = [];
    for (let row of rows) {
      let message = new Message(row.msg, row.time);
      list.push(message);
    }
    return list;
  } catch (error) {
    console.error("database connection failed. " + error);
  }
}


async function insertOne(message) {
    try {
        const [rows, fieldDefs] = await db.pool.query(`
            INSERT INTO ${tableName} (msg, time) VALUES (?, ?)
        `, [message.msg, message.time]);
    } catch (error) {
        console.error("database connection failed. " + error);
        throw error;
    }
 }
 async function insertMany(messages) { 
    for (let message of messages) { 
        await insertOne(message); 
     } 
 }
 
 module.exports =  { Message, all, sync, insertOne, insertMany }
 
 