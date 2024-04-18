const express=require('express');
const router=express.Router();
const authController=require('./../Controller/authController');
router.post("/signup",authController.signup);
router.post("/login",authController.login);
router.post('/forgotPassword',authController.forgotPassword)


module.exports=router;