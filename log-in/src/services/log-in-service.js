const axios = require("axios");
const { UserRepository } = require("../../../database");
const {
  GenerateSalt,
  GeneratePassword,
  ValidatePassword,
  GenerateSignature,
  ValidateSignature,
} = require("../../../utils");

class LogInService {
  constructor() {
    this.repository = new UserRepository();
  }

  async SignUp({ email, password }) {
    try {
      const salt = await GenerateSalt();
      const userPassword = await GeneratePassword(password, salt);
      const user = await this.repository.CreateUser({
        email,
        password: userPassword,
        salt,
      });
      return user;
    } catch (err) {
      console.log("error", err);
    }
  }

  async LogIn({ email, password }) {
    try {
      const user = await this.repository.FindUser(email);
      if (user) {
        const validPassword = await ValidatePassword(
          password,
          user.password,
          user.salt
        );

        if (validPassword) {
          const token = await GenerateSignature(
            {
              email: user.email,
              _id: user._id,
            },
            true
          );
          return { email: user.email, token };
        }
      }
    } catch (err) {
      console.log("error", err);
    }
  }

  async ListNegocioUsers(signature, params) {
    try {
      await ValidateSignature(signature, true);
      const token = await GenerateSignature({}, false);
      const response = await axios.get("http://localhost:8001/list", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      return response?.data;
    } catch (err) {
      console.log("error", err);
    }
  }
}

module.exports = LogInService;
