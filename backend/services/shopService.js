const USER = require("../models/userModel")

module.exports = class ShopService {
    static shopExists(shopName) {
        USER.find({ shopName }).exec().then((users) => {
            console.log("USERS FOUND :", users);
            if (users.length == 1) {
                return true;
            }
            else if (users.length == 0) {
                return false;
            }
            else {
                throw "More then one users with shopName " + shopName;
            }

        })
    }

    static addShop(id, shopName) {
        USER.updateOne({ _id: id }, { $set: { shopName: shopName } }, { upsert: true }, function (err, res) {
            console.log("updated");
        });
    }

}