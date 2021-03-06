const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  emailID: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  dob: { type: Date },
  gender: { type: String },
  profilePicture: { type: String },
  country: { type: String },
  city: { type: String },
  address: { type: String },
  about: { type: String },
  phoneNumber: { type: String },
  currencyID: { type: String, default: "USD" },
  shopName: { type: String },
  userDefinedCategories: [
    {
      type: String,
    },
  ],
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "item" }],
  favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "item" }],
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;