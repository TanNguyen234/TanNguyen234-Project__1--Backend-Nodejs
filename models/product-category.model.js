//File thiết lập schema của product
const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);//Tạo slug

const schemaProductCategory = new mongoose.Schema({//Thiết lập schema
  title: String,
  parent_id: {
    type: String,
    default: ''
  },
  description: String,
  thumbnail: String,
  status: String,
  position: Number,
  slug: {
    type: String,
    slug: "title",
    unique: true //Đảm bảo slug duy nhất
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deleteAt: Date
}, {timestamps: true});//Hàm mongoose nếu giá trị là true thì nó sẽ tự động lưu lại [ngày tạo] và khi uppdate nó cg tự động lưu [ngày updata]

const ProductCategory = mongoose.model("ProductCategory", schemaProductCategory, "products-category"); //Kết nối tới collection có tên products

module.exports = ProductCategory;