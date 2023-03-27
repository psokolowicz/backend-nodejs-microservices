const express = require("express");
const port = 8000;
const endpoints = require("./api");

const StartServer = async () => {
  const app = express();

  await endpoints(app);

  app.get("/", (req, res) => {
    res.send("Log In service");
  });

  app.listen(port, () => {
    console.log(`Log In service listening on port ${port}`);
  });
};

StartServer();
