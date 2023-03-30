const express = require("express");
const LogInService = require("../services/log-in-service");
const { ErrorHandler } = require("../../../utils");

module.exports = (app) => {
  const service = new LogInService();

  app.use(express.json({ limit: "1mb" }));

  app.post("/signup", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await service.SignUp({ email, password });
      if (user) {
        return res.json(user);
      } else {
        return ErrorHandler(res, "Invalid");
      }
    } catch (err) {
      console.log(err);
    }
  });

  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await service.LogIn({ email, password });
      if (user) {
        return res.json(user);
      } else {
        return ErrorHandler(res, "Invalid");
      }
    } catch (err) {
      console.log(err);
    }
  });

  app.get("/list", async (req, res) => {
    try {
      const signature = req.get("Authorization");
      let { email, page } = req.query;
      const users = await service.ListNegocioUsers(signature, email, page);
      if (users) {
        return res.json(users);
      } else {
        return ErrorHandler(res, "Invalid");
      }
    } catch (err) {
      console.log(err);
    }
  });
};
