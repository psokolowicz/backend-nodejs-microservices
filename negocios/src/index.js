const express = require("express");
const port = 8001;
const endpoints = require("./api");

const StartServer = async () => {
  const app = express();

  await endpoints(app);

  app.get("/", (req, res) => {
    res.send("ERROR. No access from localhost");
  });

  app.post("/", (req, res) => {
    // JWT
  });

  app.listen(port, () => {
    console.log(`Negocios service listening on port ${port}`);
  });
};

StartServer();
