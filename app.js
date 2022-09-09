const express = require('express')
const app = express()
const session = require('express-session')
const passport = require('passport')
const google = require('./src/router/google')
const facebook = require('./src/router/facebook')
const cors = require('cors')
const https = require('https')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'true')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})
app.use(cors())
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use(google)
app.use(facebook)

app.listen(process.env.APP_PORT, () => {
  console.log('App running at port ' + process.env.APP_PORT)
})

// const sslServer = https.createServer(
//   {
//     key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//     cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
//   },
//   app
// )

// sslServer.listen(process.env.APP_PORT, () => {
//   console.log('App running at port ' + process.env.APP_PORT)
// })
