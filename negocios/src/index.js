const express = require("express");
const { NEGOCIO_PORT } = require("../../config");
const { databaseConnection } = require("../../database");
const endpoints = require("./api");

const StartServer = async () => {
  const app = express();

  await databaseConnection();
  await endpoints(app);

  app.get("/", (req, res) => {
    res.send("Negocios service");
  });

  app.listen(NEGOCIO_PORT, () => {
    console.log(`Negocios service listening on port ${NEGOCIO_PORT}`);
  });
};

StartServer();
