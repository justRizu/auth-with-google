const express = require('express')
const router = express.Router()
const userController = require('../controller/user')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const db = require('../database/models')
require('../auth/google')
const { user } = db

router.get('/', userController.test)
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureMessage: 'Cannot login to google',
    failureRedirect: '/auth/google/failure',
    successRedirect: 'http://localhost:3000',
  }),
  (req, res) => {
    const data = req.user
    const payload = data
    const token = jwt.sign(payload, 'secret')
    console.log(data)
    res.status(200).json({ token })
  }
)

module.exports = router
