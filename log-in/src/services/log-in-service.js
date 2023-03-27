const { UserRepository } = require("../../../database");

class LogInService {
  constructor() {
    this.repository = new UserRepository();
  }

  async SignUp() {
    try {
      const user = await this.repository.CreateUser({
        email: "test1",
        password: "test2",
      });
      console.log("signup", user);
    } catch (err) {
      console.log("error");
    }
  }

  async LogIn() {
    try {
      const user = await this.repository.FindUser("test2");
      console.log("login", user);
    } catch (err) {
      console.log("error");
    }
  }
}

module.exports = LogInService;
