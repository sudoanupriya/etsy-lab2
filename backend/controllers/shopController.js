const USER = require("../models/userModel")

const createShop = async function (req, res) {
    let { shopName, id } = req.body;
    //let user = NULL;
    console.log(shopName, id)

    //check if shopName exisits in collection
    USER.find({ shopName }).exec().then((users) => {
        console.log("USERS FOUND :", users);
        if (users.length == 1) {
            res.statusMessage = "Shop name already taken by user : " + users[0]._id;
            res.sendStatus(409).end();
        } else if (users.length == 0) {
            USER.find({ _id: id }).exec().then((users) => {
                let user = users[0];
                user.shopName = shopName;
                console.log(user);
                USER.updateOne({ _id: id }, { $set: { shopName: shopName }}, { upsert: true }, function(err, res){
                    console.log("updated");
                });
                res.statusMessage = "SHOP " + shopName + " CREATED";
                res.sendStatus(200).end();
            })

        }
        else {
            res.statusMessage = "More then one users with shopName " + shopName
            res.sendStatus(500);
        }
    })

    //res.sendStatus(200);

}

module.exports = {
    createShop
};