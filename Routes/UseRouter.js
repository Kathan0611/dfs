const express = require("express");
const UserController = require("./../Controller/UserController");
const router = express.Router();
router.post("/CreateUser",UserController.createUser);
router.get("/getAllUser",UserController.getAllUser);
// console.log(":::::::::::::::::")
router.get("/singleUser/:id",UserController.singleUser);
router.put("/updateUser/:id",UserController.upadateUser);
router.delete("/deleteUser/:id",UserController.deleteUser);

module.exports = router;
