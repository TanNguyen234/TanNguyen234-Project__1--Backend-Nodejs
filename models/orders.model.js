const mongoose = require("mongoose");
const generate = require('../helpers/generate');

const ordersSchema = new mongoose.Schema({//Thiết lập schema
//   user_id: String,
  cart_id: String,
  userInfor: {
    fullName: String,
    phone: String,
    address: String
  },
  products: [
    {
      product_id: String,
      price: Number,
      discountPercentage: Number,
      quantity: Number
    }
  ],
  deleted: {
    type: Boolean,
    default: false
  },
  deleteAt: Date
}, {timestamps: true});//Hàm mongoose nếu giá trị là true thì nó sẽ tự động lưu lại [ngày tạo] và khi uppdate nó cg tự động lưu [ngày updata]

const Orders = mongoose.model("Orders", ordersSchema, "orders"); //Kết nối tới collection có tên products

module.exports = Orders;