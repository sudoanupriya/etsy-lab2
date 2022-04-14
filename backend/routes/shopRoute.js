const express = require("express");
const router = express.Router();
const controller = require("../controllers/shopController");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.post("/", passport.authenticate("jwt", { session: false }), controller.createShop);
router.post("/addItem", passport.authenticate("jwt", { session: false }), controller.addItem);
router.post("/updateItem", passport.authenticate("jwt", { session: false }), controller.updateItem);
router.get("/:shopName", passport.authenticate("jwt", { session: false }), controller.getShopDetails);
// router.post("/display-picture/:key", passport.authenticate("jwt", { session: false }), controller.createShop);
// router.post("/display-picture/upload", passport.authenticate("jwt", { session: false }), controller.createShop);
  
  module.exports = router;