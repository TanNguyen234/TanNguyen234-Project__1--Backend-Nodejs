//File thiết lập schema của product
const mongoose = require("mongoose");
const generate = require('../helpers/generate');

const accountSchema = new mongoose.Schema({//Thiết lập schema
  fullName: String,
  email: String,
  password: String,
  token: {
    type: String,
    default: generate.generateRandomString(20)
  },
  phone: String,
  avatar: String,
  role_id: String,
  status: String,
  deleted: {
    type: Boolean,
    default: false
  },
  deleteAt: Date
}, {timestamps: true});//Hàm mongoose nếu giá trị là true thì nó sẽ tự động lưu lại [ngày tạo] và khi uppdate nó cg tự động lưu [ngày updata]

const Accounts = mongoose.model("Accounts", accountSchema, "accounts"); //Kết nối tới collection có tên products

module.exports = Accounts;