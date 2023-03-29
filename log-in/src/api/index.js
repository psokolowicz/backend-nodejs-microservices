const express = require("express");
const LogInService = require("../services/log-in-service");

module.exports = (app) => {
  const service = new LogInService();

  app.use(express.json({ limit: "1mb" }));

  app.post("/signup", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await service.SignUp({ email, password });
      return res.json(user);
    } catch (err) {
      console.log(err);
    }
  });

  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await service.LogIn({ email, password });
      return res.json(user);
    } catch (err) {
      console.log(err);
    }
  });

  app.get("/list", async (req, res) => {
    try {
      const signature = req.get("Authorization");
      const { email, page } = req.query;
      const users = await service.ListNegocioUsers(signature, { email, page });
      return res.json(users);
    } catch (err) {
      console.log(err);
    }
  });
};
