const express = require("express");
const port = 8001;
const { databaseConnection } = require("../../database");
const endpoints = require("./api");

const StartServer = async () => {
  const app = express();

  await databaseConnection();
  await endpoints(app);

  app.get("/", (req, res) => {
    res.send("Negocios service");
  });

  app.listen(port, () => {
    console.log(`Negocios service listening on port ${port}`);
  });
};

StartServer();
