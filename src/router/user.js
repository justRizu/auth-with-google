const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("../../auth");

router.get("/", userController.test);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/halamanwebsite",
    failureRedirect: "/auth/google/failure",
  })
);

router.get("/halamanwebsite", (req, res) => {
  if (req.user) {
    const payload = req.user;
    const token = jwt.sign(payload, "ini rahasia");
    res.json(token);
  } else {
    res.json("belum login kah?");
  }
});

module.exports = router;
