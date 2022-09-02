const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const jwt = require("jsonwebtoken");
const db = require("./src/database/models");
const { user } = db;
passport.use(
  new FacebookStrategy(
    {
      clientID: "635628774556408",
      clientSecret: "e2e625ee81eba2dba3fc30203ddc1f25",
      callbackURL: "http://localhost:3000/token",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await user.findOne({
        where: { email: profile.emails[0].value },
      });
      if (existingUser) {
        return done(null, existingUser);
      }
      const data = await user.create({
        fullname: profile.displayName,
        username: profile.displayName,
        email: profile.emails[0].value,
      });
      const updateIsActive = await user.update(
        {
          isActive: true,
        },
        { where: { email: profile.emails[0].value } }
      );
      console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
