const LoginService = require("../serivces/loginService");
const encrypt = require("../serivces/encrypt");
const jwt = require("jsonwebtoken");

module.exports = class LoginController {
  static async loginUser(req, res) {
    console.log("here");
    const data = {
      emailID: req.body.emailID,
      password: req.body.password,
    };
    const returnMessage = {};

    //check if all the fields are present or not
    if (!(data.emailID && data.password)) {
      res.status(404).send({
        ...returnMessage,
        success: false,
        status: 400,
        message: "All the fields are required",
      });
    } else {
      try {
        const userObj = await LoginService.getUser(data);

        if (userObj && !userObj.userFound) {
          console.log("The user", data.emailID, "does not exist.");
          res.status(400).send({
            ...returnMessage,
            success: false,
            status: 400,
            message: "The user does not exist.",
          });
        } else {
          console.log(
            "The user",
            data.emailID,
            "found. Moving ahead with encrypting password and comparing that."
          );
          const passwordMatch = await encrypt.comparePassword(
            data.password,
            userObj.user.password
          );
          if (!passwordMatch) {
            returnMessage.success = false;
            returnMessage.status = "400";
            returnMessage.message = "Invalid credentials";
            return res.status(400).send(returnMessage);
          } else {
            const user = JSON.parse(JSON.stringify(userObj.user));
            delete user.password;
            const token = jwt.sign(user, process.env.SECRET_KEY, {
              expiresIn: "24h",
            });
            returnMessage.user = user;
            returnMessage.token = token;
            returnMessage.success = true;
            returnMessage.status = "200";
            return res.status(200).send(returnMessage);
          }
        }
      } catch (error) {
        console.log(
          "some error occured in loginController.js and the error is",
          error
        );
        res.status(500).json({ error: error });
      }
    }
  }
};
