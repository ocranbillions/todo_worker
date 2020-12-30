const express = require('express');
const app = express();
require("dotenv/config")
const worker = require("./worker")

app.get('/', (req, res) => {
  res.status(200).json({message: "Worker service is up and running!"});
});

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Worker is runnning in port: ${port}`);
  worker();
});