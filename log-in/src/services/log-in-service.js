const axios = require("axios");
const { UserRepository } = require("../../../database");
const {
  GenerateSalt,
  GeneratePassword,
  ValidatePassword,
  GenerateSignature,
  ValidateSignature,
} = require("../../../utils");
const { NEGOCIO_URL } = require("../../../config");

class LogInService {
  constructor() {
    this.repository = new UserRepository();
  }

  async SignUp({ email, password }) {
    try {
      const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (!email || !password || !email.match(emailFormat)) {
        return;
      }
      const salt = await GenerateSalt();
      const userPassword = await GeneratePassword(password, salt);
      const user = await this.repository.CreateUser({
        email,
        password: userPassword,
        salt,
      });
      return { _id: user._id, email: user.email };
    } catch (err) {
      console.log(err);
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
          return { _id: user._id, email: user.email, token };
        } else {
          return;
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async ListNegocioUsers(signature, email, page) {
    try {
      await ValidateSignature(signature, true);
      const token = await GenerateSignature({}, false);
      email = email ? email : "";
      page = page && parseInt(page) ? page : 0;
      const response = await axios.get(`${NEGOCIO_URL}/list`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { email, page },
      });
      return response?.data;
    } catch (err) {
      console.log(err);
      return;
    }
  }
}

module.exports = LogInService;
