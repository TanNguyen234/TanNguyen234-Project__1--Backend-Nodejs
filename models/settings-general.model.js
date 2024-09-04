//File thiết lập schema của product
const mongoose = require("mongoose");

const settingsGeneralSchema = new mongoose.Schema({//Thiết lập schema
  websiteName: String,
  logo: String,
  phone: String,
  email: String,
  address: String,
  copyright: String
}, {timestamps: true});//Hàm mongoose nếu giá trị là true thì nó sẽ tự động lưu lại [ngày tạo] và khi uppdate nó cg tự động lưu [ngày updata]

const SettingsGeneral = mongoose.model("SettingsGeneral", settingsGeneralSchema, "settings-general"); //Kết nối tới collection có tên products

module.exports = SettingsGeneral;