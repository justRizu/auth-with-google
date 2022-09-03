const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "162310143556-js6kb5ur22jt2mr4b40bidcgnt6im5l6.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3500/auth/google/callback",
      passReqToCallback: true,
    },
    (req, res, accessToken, profile, done) => {
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
