const express = require("express");
const app = express();
const user = require("./src/router/user");
const session = require("express-session");
const passport = require("passport");

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(user);

app.listen(3000, () => console.log("Listening at port: " + 3000));
