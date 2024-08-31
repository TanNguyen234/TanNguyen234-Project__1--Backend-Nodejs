const mongoose = require("mongoose");

const forgotPasswordSchema = new mongoose.Schema({//Thiết lập schema
  email: String,
  otp: String,
  expireAt: {
    type: Date,
    expires: 180 //Bằng Date truyền bên controller sang + 180 giây
  }
}, {timestamps: true});//Hàm mongoose nếu giá trị là true thì nó sẽ tự động lưu lại [ngày tạo] và khi uppdate nó cg tự động lưu [ngày updata]

const ForgotPassword = mongoose.model("ForgotPassword", forgotPasswordSchema, "forgot-password");

module.exports = ForgotPassword;