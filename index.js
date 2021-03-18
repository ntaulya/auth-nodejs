const authConfig = require('./config/authConfig');
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
app.use(bodyParser.json())

// Run Server
app.listen(5000, () => console.log("Server running on 5000"));

const auth = require("./routes/auth");
const user = require("./routes/user");

// Middlewares
app.use(
    session({
        name: 'session-id',
        secret: 'scret',
        saveUninitialized: false,
        resave: false,
        cookie: {
            expires: 600000
        }
    })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());
authConfig(passport);

// Routes
app.use("/auth", auth);
app.use("/user", user);