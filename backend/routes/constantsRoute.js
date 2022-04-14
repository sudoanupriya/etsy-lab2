const express = require("express");
const router = express.Router();
const controller = require("../controllers/constantsController");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get("/countries", passport.authenticate("jwt", { session: false }), controller.getCountries);
router.get("/categories", passport.authenticate("jwt", { session: false }), controller.getCategories);
router.get("/currencies", passport.authenticate("jwt", { session: false }), controller.getCurrencies);
// router.post("/categories", Controller.getCategories);
// router.post("/currencies", Controller.getCurrencies);

module.exports = router;
