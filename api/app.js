const express = require("express");
var cors = require('cors')
const { participants } = require("./data");

const app = express();
app.use(cors())
app.get("/participants", (_, res) => {
  res.json(participants);
});

module.exports = { app };
