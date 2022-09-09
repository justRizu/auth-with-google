const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const db = require('../database/models')
const { user } = db
const jwt = require('jsonwebtoken')

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '162310143556-js6kb5ur22jt2mr4b40bidcgnt6im5l6.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3500/auth/google/callback',
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const defaultUser = {
        username: profile.displayName,
        fullname: profile.displayName,
        email: profile.email,
        isActive: true,
      }
      const data = await user
        .findOrCreate({
          where: { email: profile.email },
          defaults: defaultUser,
        })
        .catch((err) => {
          console.log('Error signing up', err)
          done(err, null)
        })
      if (data && data[0]) return done(null, data)
    }
  )
)

passport.serializeUser((user, done) => {
  console.log('Serializing user : ', user)
  // console.log(token)
  done(null, user)
})

passport.deserializeUser(async (user, done) => {
  console.log('Error deserializing user')
  done(null, user)
})

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: '635628774556408',
//       clientSecret: 'e2e625ee81eba2dba3fc30203ddc1f25',
//       callbackURL: 'http://localhost:3500/auth/facebook/callback',
//       profileFields: ['id', 'displayName', 'photos', 'email'],
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       return cb(null, profile)
//     }
//   )
// )

// passport.serializeUser(function (user, cb) {
//   cb(null, user)
// })

// passport.deserializeUser(function (user, cb) {
//   cb(null, user)
// })
