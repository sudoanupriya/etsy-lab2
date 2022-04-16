const UserModel = require("../models/userModel");
const ItemModel = require("../models/itemModel");

module.exports = class UserService {
  static async getUser({ userID }) {
    const query = { _id: userID };
    const userObj = {};
    try {
      const result = await UserModel.findOne(query);

      if (result) {
        userObj.userFound = true;
        userObj.user = result;
      } else {
        userObj.userFound = false;
      }
      return userObj;
    } catch (error) {
      console.log(`Could not fetch the user in userService service ${error}`);
    }
  }

  static async getItems({ userID }) {
    const query = { userID };
    const itemObj = {};
    try {
      const result = await ItemModel.findById(query);

      if (result) {
        itemObj.itemFound = true;
        itemObj.items = result;
      } else {
        itemObj.itemFound = false;
      }
      return itemObj;
    } catch (error) {
      console.log(`Could not fetch the item in userService getItems ${error}`);
    }
  }

  static async updateUser({ userID, userDetails }) {
    try {
      const filterCondition = { _id: userID };
      const updateCondition = userDetails;
      const result = await UserModel.findOneAndUpdate(
        filterCondition,
        updateCondition,
        { new: true }
      );
      if (result) {
        return result;
      } else {
        return {};
      }
    } catch (err) {
      console.log(err);
      throw new Error(
        "Some unexpected error occurred while updating user in userService.updateUser"
      );
    }
  }

  static async updateCurrency({ userID, currencyID }) {
    try {
      const filterCondition = { _id: userID };
      const updateCondition = { currencyID };
      const result = await UserModel.findOneAndUpdate(
        filterCondition,
        updateCondition,
        { new: true }
      );
      if (result) {
        return result;
      } else {
        return {};
      }
    } catch (err) {
      console.log(err);
      throw new Error(
        "Some unexpected error occurred while updating user in userService.updateUser"
      );
    }
  }

  static async getFavourites({ userID }) {
    const query = { _id: userID };
    const itemObj = {};
    try {
      const result = await UserModel.findById(query).select("favourites");
      if (result) {
        itemObj.favouritesFound = true;
        itemObj.favourites = result.favourites;
      } else {
        itemObj.itemFound = false;
      }
      return itemObj;
    } catch (error) {
      console.log(
        `Could not fetch the user in userService getFavourites ${error}`
      );
    }
  }

  static async addFavourites({ userID, itemID }) {
    try {
      const filterCondition = { _id: userID };
      const updateCondition = { favourites: itemID };
      const result = await UserModel.findOneAndUpdate(
        filterCondition,
        { $addToSet: updateCondition },
        { new: true }
      ).select("favourites");
      console.log("the result is", result);
      if (result) {
        return result;
      } else {
        return {};
      }
    } catch (err) {
      console.log(err);
      throw new Error(
        "Some unexpected error occurred while updating user in userService.updateUser"
      );
    }
  }

  static async getUserbyParameter(param, val){
    const query = { [param] : val };
    console.log(query);
    let userObj = {};
    return new Promise(function (resolve, reject){
      UserModel.findOne(query).then((res)=>{
        if (res) {
          userObj = res;
          console.log("INSIDE GET USER", userObj);
          resolve(userObj);
        } else {
          reject("User does NOT exist with shopName "+val);
        }
      }).catch(err=>{throw err});
    });
      
      
  }
};