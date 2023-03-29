const { ValidateSignature } = require("../../../utils");
const { UserRepository } = require("../../../database");

class NegociosService {
  constructor() {
    this.repository = new UserRepository();
  }
  async ValidateEndpoint(signature) {
    try {
      const isValid = await ValidateSignature(signature);
      return isValid;
    } catch (err) {
      console.log("error", err);
    }
  }

  async GetUsers(email, page) {
    try {
      const usersData = await this.repository.GetUsers(email, page);
      return usersData;
    } catch (err) {
      console.log("error", err);
    }
  }
}

module.exports = NegociosService;
