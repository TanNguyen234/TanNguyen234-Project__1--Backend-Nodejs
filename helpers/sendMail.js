const nodemailer = require("nodemailer");

module.exports.sendMail = async (email, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Không phải tài khoản gmail bình thường mà là tài khoản xác thực 2 bước
      pass: process.env.EMAIL_PASS
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    html: html
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: " + info.response);
    }
  });
};
