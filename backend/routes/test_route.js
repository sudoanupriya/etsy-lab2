const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json(
    `Server is listening on port ${process.env.PORT}`
  );
});

module.exports = router;
