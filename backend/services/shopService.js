const USER = require("../models/userModel");

module.exports = class ShopService {
    static async shopExists(shopName) {
        let result = USER.find({ shopName }).exec();
        // .then((users) => {
        //     console.log("USERS FOUND :", users);
        //     if (users.length == 1) {
        //         console.log("t");
        //         result = true;
        //     }
        //     else if (users.length == 0) {
        //         console.log("f");
        //         result = false;
        //     }
        //     else {
        //         throw "More then one users with shopName " + shopName;
        //     }

        // })
        console.log(result);
        return result;
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