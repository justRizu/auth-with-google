const express = require("express");
const app = express();
const user = require("./src/router/user");
const session = require("express-session");
const passport = require("passport");
const facebook = require("./src/router/facebook");
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(user);
app.use(facebook);

app.listen(3500, () => console.log("Listening at port: " + 3500));
