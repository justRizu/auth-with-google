const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const passport = require("passport");
require("../auth/authFacebook");

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    authType: "reauthenticate",
    scope: ["email", "profile"],
  })
);
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/token",
    failureRedirect: "/login",
  })
);

router.get("/token", (req, res) => {
  res.json("hallo");
});

module.exports = router;
