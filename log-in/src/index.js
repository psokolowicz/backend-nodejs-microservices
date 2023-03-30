const express = require("express");
const { LOGIN_PORT } = require("../../config");
const { databaseConnection } = require("../../database");
const endpoints = require("./api");

const StartServer = async () => {
  const app = express();

  await databaseConnection();
  await endpoints(app);

  app.get("/", (req, res) => {
    res.send("Log In service");
  });

  app.listen(LOGIN_PORT, () => {
    console.log(`Log In service listening on port ${LOGIN_PORT}`);
  });
};

StartServer();
