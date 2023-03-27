class LogInService {
  async SignUp() {
    try {
      console.log("signup");
    } catch (err) {
      console.log("error");
    }
  }

  async LogIn() {
    try {
      console.log("login");
    } catch (err) {
      console.log("error");
    }
  }
}

module.exports = LogInService;
