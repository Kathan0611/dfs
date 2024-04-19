// const nodemailer= require('nodemailer');
// // const express=require('express');
// const jwt= require('jsonwebtoken');
// const User=require('./../model/UserModel');
// const bcrypt= require('bcrypt');
// const transporter=require('./../utils/noemailer')

const nodemailer = require("nodemailer");

// const transporter=nodemailer.createTransport({
//     serivce:'gmail',
//     auth:{
//         username:"adalajakathan06@gmail.com",
//         passowrd:'ifgm vuxc ywcs fcxh'
//     }
// })

// exports.signup= async (req,res)=>{
//     try{
//         const {email,username,password}=req.body;

//         if(email && username && password){

//             const hashPassword =bcrypt.hashSync(password,12);
//              const token=jwt.sign((username ||email), process.env.SECRET_KEY)

//              const newUser= new User({name:username,email:email,password:hashPassword})

//              await newUser.save();

//              return res.status(200).json({
//                  status:'success',
//                  message:'Signup Successfully',
//                  data:{
//                     token:token,
//                     user:newUser

//                  }
//                 })

//             }
//         }
//         catch(err){
//             res.status(400).json({

//                 message:err.message
//             })
//         }
//     }

//     exports.login= async (req,res)=>{
//         try{
//             const {email,name,password} =req.body;

//             if((email || name) && password){

//                 const token= jwt.sign((email||name),process.env.SECRET_KEY)
//                 console.log(token)
//                const existUser= await User.findOne({$or: [{email:email} , {name:name}]})

//                 if(!existUser){
//                        return res.status(403).json({message:"Unauthroized User"})
//                     }
//                  return res.status(200).json({
//                     status:'Success',
//                     message:'Logging Successfully',
//                     data:{
//                        token:token,
//                        User:existUser
//                     }
//                  })

//         }

//         else{
//             res.status(204).json({message:'Please fill required filled'})
//         }

//     }
//     catch(err){
//         res.status(400).json({message:err.message})
//     }
// }

// exports.forgotPassword= async(req,res)=>{
//       try{
//          const {email}=req.body;

//          const mail =await User.findOne({email:email});
//          console.log(mail._id)
//          if(!mail){
//              res.status(204).json({message:"please filled  valid email"});
//             }

//             let otp = Math.floor(1000 + Math.random() * 9000);
//             let otpExpier = new Date();
//             // console.log(otpExpier.())
//             otpExpier.setMinutes(otpExpier.getMinutes() + 2);
//             console.log(otp,otpExpier,"DDDDDDDD")
//             await User.findOneAndUpdate({ email:email }, { $set: { otp, otpExpier } },{new:true});

// // let info = await transporter.sendMail(mailOptions);
// // console.log(`Message Sent: ${info.messageId}`);
// // }
//         let info= await transporter.sendMail({
//         from: 'adalajakathan06@gmail.com',
//         to: 'adalajaketan7@gmail.com',
//         subject: 'Password Reset OTP',
//         text: `Your OTP for password reset is: ${otp}`
//     });

//       console.log(`Message Sent: ${info.messageId}`);
//       }
//       catch(err){
//         res.status(500).json({message:err.message})
//       }
//    }

const jwt = require("jsonwebtoken");
const User = require("./../model/UserModel");
const bcrypt = require("bcrypt");
const { sendOtpMail } = require("../utils/noemailer");
// const transporter = require('./../utils/noemailer'); // Update to correct path for nodemailer

exports.signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (email && username && password) {
      const hashPassword = bcrypt.hashSync(password, 12);
      const token = jwt.sign(username || email, process.env.SECRET_KEY);

      const newUser = new User({
        name: username,
        email: email,
        password: hashPassword,
      });

      await newUser.save();

      return res.status(200).json({
        status: "success",
        message: "Signup Successfully",
        data: {
          token: token,
          user: newUser,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if ((email || name) && password) {

      const existUser = await User.findOne({
        $or: [{ email: email }, { name: name }],
      });

      if (!existUser) {
        return res.status(400).json({ message: "document is not found" });
      }
      else{

          const token=jwt.sign(existUser.id,process.env.SECRET_KEY);

              if(!token){
                return res.status(400).json({message:"User token is generator "})
              }
              else{
                    // const hashPassword=bcrypt.compareSync()
                   if(((email===existUser.email)||(name===existUser.name)) && bcrypt.compareSync(password,existUser.password)){
                        
                       return res.status(200).json({
                        status:"Success",
                        message:"Successfully Loggding",
                         data:{
                            token:token,
                             user:existUser
                         }
                       })
                   }
              }
           
        } 
      }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Please provide a valid email address" });
    }

    let otp = Math.floor(1000 + Math.random() * 9000);
    // let otpExpire = new Date();
    // otpExpire.setMinutes(otpExpire.getMinutes() + 2);

    await User.findOneAndUpdate(
      { email: email },
      { $set: { otp: otp, otpExpiration: Date.now() + 600000 } },
      { upsert: true, new: true }
    );
    await sendOtpMail(otp);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { otp, newpassword } = req.body;

    if (!otp || !newpassword) {
      res.status(204).json({ message: "Data is not Found" });
    }

    const user = await User.findOne({ otp: otp });
    console.log(user);
    if (!user || user.otpExpiration < Date.now()) {
      return res.status(400).json("Invalid OTP");
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);

    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiration = null;
    // console.log(user)
    await user.save();

    return res.json({
      data: "Password reset successful",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
