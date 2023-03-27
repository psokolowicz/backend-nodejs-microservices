const NegociosService = require("../services/negocios-service");

module.exports = (app) => {
  const service = new NegociosService();

  app.get("/list", async (req, res) => {
    try {
      await service.List();
    } catch (err) {
      console.log(err);
    }
  });
};
