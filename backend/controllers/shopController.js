const USER = require("../models/userModel")
const SERVICE = require("../services/shopService");

module.exports = class ShopController {
    static createShop(req, res) {
        let { shopName, id } = req.body;

        try {
            if (SERVICE.shopExists(shopName)) {
                res.statusMessage = "Shop name already taken by a user";
                res.sendStatus(409).end();
            }
            else {
                SERVICE.addShop(shopName);
                res.statusMessage = "SHOP " + shopName + " CREATED";
                res.sendStatus(200).end();
            }
        } catch (e){
            res.statusMessage = e;
            res.sendStatus(500);
        }
}
};