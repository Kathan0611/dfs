// // const express=require('express');
// const jwt= require('jsonwebtoken');
// const User=require('./../model/UserModel');
// const bcrypt= require('bcrypt');
// const transporter=require('./../utils/noemailer')

// // const nodemailer= require('nodemailer');

// // nodemailer.createTransport({
// //     serivce:'gmail',
// //     auth:{
// //         username:"adalajakathan06@gmail.com",
// //         passowrd:'ifgm vuxc ywcs fcxh'
// //     }
// // })

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


const jwt = require('jsonwebtoken');
const User = require('./../model/UserModel');
const bcrypt = require('bcrypt');
const transporter = require('./../utils/noemailer'); // Update to correct path for nodemailer

exports.signup = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (email && username && password) {
            const hashPassword = bcrypt.hashSync(password, 12);
            const token = jwt.sign((username || email), process.env.SECRET_KEY);

            const newUser = new User({ name: username, email: email, password: hashPassword });

            await newUser.save();

            return res.status(200).json({
                status: 'success',
                message: 'Signup Successfully',
                data: {
                    token: token,
                    user: newUser
                }
            });
        }
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        if ((email || name) && password) {
            const token = jwt.sign((email || name), process.env.SECRET_KEY);
            console.log(token);
            const existUser = await User.findOne({ $or: [{ email: email }, { name: name }] });

            if (!existUser) {
                return res.status(403).json({ message: "Unauthorized User" });
            }
            return res.status(200).json({
                status: 'Success',
                message: 'Logging Successfully',
                data: {
                    token: token,
                    User: existUser
                }
            });
        } else {
            res.status(204).json({ message: 'Please fill required fields' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(204).json({ message: "Please provide a valid email address" });
        }

        let otp = Math.floor(1000 + Math.random() * 9000);
        let otpExpire = new Date();
        otpExpire.setMinutes(otpExpire.getMinutes() + 2);

        
        user.otp = otp;
        user.otpExpire = otpExpire;
        await user.save();

      const mailOptions= {
      form:"adalajakathan06@gmail.com",
      to:"adalajaketan7@gmail.com",
      subject:'Password reset OTP',
      text: `Your OTP (It is expired after 2 min) : ${otp}`,
}
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.log('Error', error);
          }
          else{
              console.log('Success', info);
          }
      });
       
       return  res.status(200).json({ message: "OTP sent successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
