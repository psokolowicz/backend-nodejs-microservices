const { UserModel } = require("../models");

class UserRepository {
  async CreateUser({ email, password, salt }) {
    try {
      const user = new UserModel({
        email,
        password,
        salt,
      });
      const userResult = await user.save();
      return userResult;
    } catch (err) {
      console.log(err);
    }
  }

  async GetUsers(email, page) {
    try {
      const users = await UserModel.find({
        email: { $regex: `${email}`, $options: "i" },
      })
        .skip(2 * page)
        .limit(2);

      const count = await UserModel.count({
        email: { $regex: `${email}`, $options: "i" },
      });
      return {
        users: users.map((u) => {
          return { _id: u._id, email: u.email };
        }),
        totalPages: Math.ceil(count / 2),
      };
    } catch (err) {
      console.log(err);
    }
  }

  async FindUser(email) {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = UserRepository;
