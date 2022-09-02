const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("../../auth");
const db = require("../database/models");
const { user } = db;

router.get("/", userController.test);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
  }),
  function (req, res) {
    if (req.user) {
      const data = req.user;
      const payload = data.dataValues;
      const token = jwt.sign(payload, "ini rahasia");
      res.status(201).json({ token });
    }
  }
);

router.get("/token/from-google", (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.json("belum login kah?");
  }
});

module.exports = router;
