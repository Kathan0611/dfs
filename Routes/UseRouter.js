const express = require("express");
const UserController = require("./../Controller/UserController");
const router = express.Router();
router.post("/CreateUser",UserController.createUser);
router.get("/get5document",UserController.get5document);
// console.log(":::::::::::::::::")
router.get("/singleUser/:id",UserController.singleUser);
router.put("/updateUser/:id",UserController.upadateUser);
router.delete("/deleteUser/:id",UserController.deleteUser);
router.get('/dashbord',UserController.dashbord)
module.exports = router;
