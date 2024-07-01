const express = require('express');
var router = express.Router();

/* GET echo listing. */
const model = require('../models/message.js');

router.get('/:msg', async function(req, res, next) {
   const msg = req.params.msg;
   const message = new model.Message(msg, new Date());
   await model.insertMany([message]);
   const messages = await model.all();
   res.send(`${JSON.stringify(messages)}`);
});


module.exports = router;
