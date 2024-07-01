const express = require("express");
const model = require("../models/message.js");
var router = express.Router();

/* GET echo listing. */
router.get("/", async function (req, res, next) {
  // updated
  const messages = await model.all();
  res.render(`echoform`, { title: "Echo App", messages: messages });
});

router.post("/submit", async function (req, res, next) {
  // new
  const msg = req.body.message;
  console.log(req.body);
  const message = new model.Message(msg, new Date());
  await model.insertMany([message]);
  res.redirect("/echo");
});

module.exports = router;
