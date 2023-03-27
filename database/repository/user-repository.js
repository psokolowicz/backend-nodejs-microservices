const { UserModel } = require("../models");

class UserRepository {
  async CreateUser({ email, password }) {
    try {
      console.log(UserModel);
      const user = new UserModel({
        email,
        password,
      });
      const userResult = await user.save();
      return userResult;
    } catch (err) {
      console.log(err);
    }
  }

  async Users(email) {
    try {
      const users = await UserModel.find({ email });
      return users;
    } catch (err) {
      console.log(err);
    }
  }

  async FindUser(email) {
    try {
      console.log(email);
      const user = await UserModel.findOne({ email });
      return user;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = UserRepository;
