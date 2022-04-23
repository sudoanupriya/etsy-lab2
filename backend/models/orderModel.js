const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let orderSchema = new Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  items: [
    {
      itemID: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      quantity: { type: Number },
      isGiftPack: { type: Boolean },
      instructions: { type: String },
    },
  ],
});
const orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;
