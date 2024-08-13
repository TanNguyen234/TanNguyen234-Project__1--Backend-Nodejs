//File thiết lập schema của product
const mongoose = require("mongoose");

const schemaRoles = new mongoose.Schema({//Thiết lập schema
  title: String,
  description: String,
  permissions: {
    type: Array,
    default: []
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deleteAt: Date
}, {timestamps: true});//Hàm mongoose nếu giá trị là true thì nó sẽ tự động lưu lại [ngày tạo] và khi uppdate nó cg tự động lưu [ngày updata]

const Roles = mongoose.model("Roles", schemaRoles, "roles"); //Kết nối tới collection có tên products

module.exports = Roles;