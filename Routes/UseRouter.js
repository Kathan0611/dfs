const express = require("express");
const UserController = require("./../Controller/UserController");
const router = express.Router();

router.get("/products", UserController.getAllProduct);
router.post("/CreateUser", UserController.createUser);

router.get("/get5document", UserController.get5document);
router.get("/singleUser/:id", UserController.singleUser);

router.put("/updateUser/:id", UserController.upadateUser);
router.delete("/deleteUser/:id", UserController.deleteUser);

router.post("/CreateProduct", UserController.createProduct);
router.get("/getAllProduct", UserController.getAllProduct);

router.get("/dashbord", UserController.dashbord);

module.exports = router;
