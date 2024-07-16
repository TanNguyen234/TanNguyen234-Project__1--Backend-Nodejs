//File thiết lập schema của product
const mongoose = require("mongoose");

const schemaProduct = new mongoose.Schema({//Thiết lập schema
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  deleted: Boolean
});

const Product = mongoose.model("Product", schemaProduct, "products"); //Kết nối tới collection có tên products

module.exports = Product;
