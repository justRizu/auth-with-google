const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("../auth/google");
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
  async (req, res) => {
    if (req.user) {
      const athlete = req.user;
      let existingUser = await user.findOne({
        where: { email: athlete.email },
      });
      if (!existingUser) {
        const data = await user.create({
          username: athlete.displayName,
          fullname: athlete.displayName,
          email: athlete.email,
          isActive: athlete.verified,
        });
        existingUser = data;
      }
      const payload = existingUser.dataValues;
      const token = jwt.sign(payload, "secret");
      res.status(201).json({ token });
    }
  }
);

module.exports = router;
