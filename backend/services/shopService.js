const USER = require("../models/userModel");

module.exports = class ShopService {
    static shopExists(shopName) {
        USER.find({ shopName }).exec().then((users) => {
            console.log("USERS FOUND :", users);
            if (users.length == 1) {
                console.log("t");
                return true;
            }
            else if (users.length == 0) {
                console.log("f");
                return false;
            }
            else {
                throw "More then one users with shopName " + shopName;
            }

        })
    }

    static async addShop(id, shopName) {
        await USER.updateOne({ _id: id }, { $set: { shopName: shopName } }, { upsert: true }).then((res => {
            console.log(res);
            if (res)
                console.log("Shop", shopName, "created.");
            else
                throw "Shop NOT created. Result: " + res;
        })).catch(err => { throw err });
    }

}