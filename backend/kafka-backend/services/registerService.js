const UserModel = require("../db/models/userModel");

class RegisterService {
  static async checkIfTheUserIsUnique(emailID, callback) {
    const query = { emailID };
    try {
      console.log("IN REGISTER SERVICE", query);
      let result = await UserModel.findOne(query);
      console.log(result);
      result = result == null ? true : false;
      callback(null, result);
    } catch (error) {
      console.log(`Could not fetch the user in user service ${error}`);
    }
  }

  static async createUser({ name, emailID, password, shopName }, callback) {
    try {
      const query = {
        name,
        emailID,
        password,
        shopName
      };
      const user = new UserModel(query);
      let savedUser;
      let result = await user.save().then((user) => (savedUser = user));
      result = result ? result : {};
      callback(null, result);
    } catch (error) {
      console.log("some error occured in registerService.js");
      console.log(error);
    }
  }
}

function handle_request(msg, callback) {
  if (msg.function === "checkIfTheUserIsUnique") {
    RegisterService.checkIfTheUserIsUnique(msg.data, callback);
  } else if (msg.function === "createUser") {
    RegisterService.createUser(msg.data, callback);
  }
}

exports.handle_request = handle_request;
