const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: '635628774556408',
      clientSecret: 'e2e625ee81eba2dba3fc30203ddc1f25',
      callbackURL: 'http://localhost:3500/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'photos', 'email'],
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile)
    }
  )
)

passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser(function (user, cb) {
  cb(null, user)
})
