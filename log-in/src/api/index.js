const LogInService = require("../services/log-in-service");

module.exports = (app) => {
  const service = new LogInService();

  app.post("/signup", async (req, res) => {
    try {
      await service.SignUp();
      return res.json();
    } catch (err) {
      console.log(err);
    }
  });

  app.post("/login", async (req, res) => {
    try {
      await service.LogIn();
      return res.json();
    } catch (err) {
      console.log(err);
    }
  });

  app.get("/list", async (req, res) => {
    try {
      console.log("check jwt and call negocio");
    } catch (err) {
      console.log(err);
    }
  });
};
