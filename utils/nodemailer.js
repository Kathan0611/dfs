const nodemailer = require("nodemailer");
// const smtpTransport = require("nodemailer-smtp-transport");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adalajakathan06@gmail.com",
    pass: "xmck kvgv unsz vccw",
  },
});

exports.sendOtpMail = async (otp) => {
  try {
    const mailOptions = {
      form: "adalajakathan06@gmail.com",
      to: "adalajaketan7@gmail.com",
      subject: "Password reset OTP",
      text: `Your OTP (It is expired after 2 min) : ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error", error);
      } else {
        console.log("Success", info.response);
      }
    });
  } catch (err) {
    throw err;
  }
};
