const db = require('./db.js').db;
const collectionName = 'message'

class Message {
   constructor(msg, time) {
       this.msg = msg;
       this.time = time;
   }
}

/** return all messages */
async function all() {
   try {
       const collection = db.collection(collectionName);
       const cursor = collection.find();
       var messages = [];
       while (await cursor.hasNext()) {
           const dbobj = await cursor.next();
           messages.push(new Message(dbobj.msg, dbobj.time));
       }
       return messages;
   } catch(error) {
       console.error("database connection failed." + error);
       throw error;
   }
}


async function find(p) {
    try {
        const collection = db.collection(collectionName);
        const cursor = collection.find(p);
        var messages = [];
        while (await cursor.hasNext()) {
            const dbobj = await cursor.next();
            messages.push(new Message(dbobj.msg, dbobj.time));
        }
        return messages;
    } catch(error) {
        console.error("database connection failed." + error);  throw error;
    }
 }
 /** insert a list of messages */
 async function insertMany( messages ) {
    try {
        const collection = db.collection(collectionName);
        await collection.insertMany(messages);
    } catch(error) {
        console.error("database connection failed." + error); throw error;
    }
 }
 module.exports = { Message, all, find, insertMany }
 
