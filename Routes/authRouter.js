const express=require('express');
const router=express.Router();
const authController=require('./../Controller/authController');
const {registerSchema,loginSchema,forgotSchema,resetSchema}= require('./../utils/validate')
const validateRequest=require('./../middleware/validate');


router.post("/signup",validateRequest(registerSchema),authController.signup);

router.post("/login",validateRequest(loginSchema),authController.login);
router.get('/login',(req,res)=>res.render('login'))

router.post('/forgotPassword',validateRequest(forgotSchema),authController.forgotPassword)
router.get('/forgotPassword', (req,res)=>res.render('forgot'))

router.post('/resetPassword',validateRequest(resetSchema),authController.resetPassword)
router.get('/resetPassword',(req,res)=>res.render('reset'))


module.exports=router;