const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const imageController = require("../controllers/imageController");
const multer = require('multer');
const upload = multer({ dest: '../uploads/' });

router.get(
  "/:userID",
  passport.authenticate("jwt", { session: false }),
  UserController.getUserDetails
);

router.put(
  "/:userID",
  passport.authenticate("jwt", { session: false }),
  UserController.updateUserDetails
);

router.put(
  "/updatecurrency/:userID",
  passport.authenticate("jwt", { session: false }),
  UserController.updateCurrency
);

router.get(
  "/getFav/:userID",
  passport.authenticate("jwt", { session: false }),
  UserController.getFavourites
);

router.put(
  "/addFav/:userID",
  passport.authenticate("jwt", { session: false }),
  UserController.addFavourites
);

router.put(
  "/removeFav/:userID",
  passport.authenticate("jwt", { session: false }),
  UserController.removeFavourites
);

router.get(
  "/cart/:userID",
  passport.authenticate("jwt", { session: false }),
  UserController.getCartItems
);

router.post(
  "/cart/:userID",
  passport.authenticate("jwt", { session: false }),
  UserController.addCartItems
);

router.post(
  "/removeFromCart/:userID",
  passport.authenticate("jwt", { session: false }),
  UserController.removeCartItems
);

router.post(
  "/decrementCartItemQuantity/:userID",
  passport.authenticate("jwt", { session: false }),
  UserController.decrementCartItemQuantity
);

router.get(
  "/getCategories/:userID",
  passport.authenticate("jwt", { session: false }),
  UserController.getCategories
);

router.post(
  "/category/add/:userID",
  passport.authenticate("jwt", { session: false }),
  UserController.addUserDefinedCategories
);

router.post("/dp/upload", passport.authenticate("jwt", { session: false }), upload.single("image"), imageController.uploadDp);
router.get("/dp/:key", passport.authenticate("jwt", { session: false }), imageController.getDp);
module.exports = router;