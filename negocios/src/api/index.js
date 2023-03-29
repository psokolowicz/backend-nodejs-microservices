const express = require("express");
const NegociosService = require("../services/negocios-service");

module.exports = (app) => {
  const service = new NegociosService();

  app.use(express.json({ limit: "1mb" }));

  app.get("/list", async (req, res) => {
    try {
      const signature = req.get("Authorization");
      const { email, page } = req.query;
      const isValid = await service.ValidateEndpoint(signature);
      if (isValid) {
        const usersData = await service.GetUsers(email, page);
        return res.json(usersData);
      } else {
        return res.json();
      }
    } catch (err) {
      console.log(err);
    }
  });
};
