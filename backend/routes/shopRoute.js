const express = require("express");
const router = express.Router();
const controller = require("../controllers/shopController");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    controller.createShop
  );
  
  module.exports = router;