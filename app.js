const express = require("express");
const connect = require("./dbconfig/db");
const app = express();
const path = require("path");
require("dotenv").config();
const router = require("./Routes/UseRouter");
const authRouter = require("./Routes/authRouter");
const User = require('./model/UserModel');
const ejs = require("ejs");
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");

PORT = process.env.PORT;
app.use(express.json());
app.use(express.static(__dirname + "/public"));
// console.log("LLLLLLLLLLLL")
app.use("/api/v2", authRouter);
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/submit", async(req, res) => {
  const { email, password } = req.body;
  const user= await User.aggregate([{$count:"name"}])

  res.render("dashbord", { email: 'lasan', count: user[0].name });
});

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
