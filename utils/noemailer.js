const nodemailer= require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "01b2b3a42b4434",
    pass: "fb4f164b488ae6"
  }
});

// const mailOptions= nodemailer.sendMail({
//       form:"adalajakathan06@gmail.com",
//       to:"adalajaketan7@gmail.com",
//       subject:'Password reset OTP',
//       text: `Your OTP (It is expired after 2 min) : ${otp}`,
// })

module.exports=transporter
