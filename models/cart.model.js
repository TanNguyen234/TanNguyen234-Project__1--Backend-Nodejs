const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({//Thiết lập schema
  user_id: String,
  products: [
    {
        product_id: String,
        quantity: Number
    }
  ]
}, {timestamps: true});//Hàm mongoose nếu giá trị là true thì nó sẽ tự động lưu lại [ngày tạo] và khi uppdate nó cg tự động lưu [ngày updata]

const Cart = mongoose.model("Cart", cartSchema, "cart"); //Kết nối tới collection có tên products

module.exports = Cart;