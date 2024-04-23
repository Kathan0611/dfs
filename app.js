const express = require("express");
const connect = require("./dbconfig/db");
const path = require("path");
var flash = require("express-flash");
var cookieParser = require("cookie-parser");
const session = require("express-session");
const router = require("./Routes/UseRouter");
const authRouter = require("./Routes/authRouter");
const User = require("./model/UserModel");
const newUser = require("./model/ProductModel");
const validateRequest = require("./middleware/validate");
const errorMessage = require("./middleware/validate");
require("dotenv").config();

const app = express();
PORT = process.env.PORT;
// console.log(path.join(__dirname/views))
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");

app.use(cookieParser("keyboard cat"));
app.use(
  require("express-session")({
    secret: "The milk would do that",
    resave: false,
    saveUninitialized: false,
  })
);

// app.use(function(req, res, next){
//     res.locals.message = req.flash();
//     next();
// });

app.use(flash());
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v2", authRouter);
app.use("/api/v1", router);

// app.use(validateRequest(schema));
app.get("/", (req, res) => {
  // console.log(req.flash("errorMessage"), "ggg");
  return res.render("register",{message: ""});
});
connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
