const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const passport = require("passport");
require("../../auth");

router.get("/", userController.test);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/google/failure",
  })
);

router.get("/protected", (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

module.exports = router;
