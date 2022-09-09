const express = require('express')
const router = express.Router()
const userController = require('../controller/user')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const db = require('../database/models')
const { user } = db
require('../auth/google')

router.get(
  '/auth/facebook',
  passport.authenticate('facebook', {
    authType: 'reauthenticate',
    scope: 'email',
  })
)

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
  async (req, res) => {
    if (req.user) {
      const athlete = req.user
      let existingUser = await user.findOne({
        where: { email: athlete.emails[0].value },
      })
      if (!existingUser) {
        const data = await user.create({
          username: athlete.displayName,
          fullname: athlete.displayName,
          email: athlete.emails[0].value,
          isActive: true,
        })
        existingUser = await user.findOne({
          where: { email: data.email },
        })
      }
      const payload = existingUser.dataValues
      const token = jwt.sign(payload, 'secret')
      res.status(201).json({ token })
    }
  }
)

module.exports = router
