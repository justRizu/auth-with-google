const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const jwt = require("jsonwebtoken");
const db = require("./src/database/models");
const { user } = db;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "162310143556-js6kb5ur22jt2mr4b40bidcgnt6im5l6.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, res, accessToken, refreshToken, profile, done) => {
      const existingUser = await user.findOne({
        where: { email: profile.email },
      });
      if (existingUser) {
        return done(null, existingUser);
      }
      const data = await user.create({
        fullname: profile.displayName,
        username: profile.displayName,
        email: profile.email,
      });
      const updateIsActive = await user.update(
        {
          isActive: true,
        },
        { where: { email: profile.email } }
      );
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
