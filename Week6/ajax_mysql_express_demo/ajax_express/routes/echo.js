const express = require("express");
const model = require("../models/message.js");
var router = express.Router();

/* GET echo listing. */

router.get("/", async function (req, res, next) {
  res.render(`echoajax`, { title: "Echo App" });
});

router.get("/all", async function (req, res, next) {
  const messages = await model.all();
  res.send(`${JSON.stringify(messages)}`);
});

router.post("/submit/", async function (req, res, next) {
  const msg = req.body.msg;
  const message = new model.Message(msg, new Date());
  await model.insertMany([message]);
  const messages = await model.all();
  res.send(`${JSON.stringify(messages)}`);
});

module.exports = router;
