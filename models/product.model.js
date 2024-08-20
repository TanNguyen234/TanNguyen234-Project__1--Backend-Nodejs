//File thiết lập schema của product
const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);//Tạo slug

const schemaProduct = new mongoose.Schema({//Thiết lập schema
  title: String,
  product_category_id: {
    type: String,
    default: ''
  },
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  slug: {
    type: String,
    slug: "title",
    unique: true //Đảm bảo slug duy nhất
  },
  createdBy: {
    account_id: String,
    create_at: {
      type: Date,
      default: Date.now()
    }
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedBy: {
    account_id: String,
    delete_at: Date
  },
}, {timestamps: true});//Hàm mongoose nếu giá trị là true thì nó sẽ tự động lưu lại [ngày tạo] và khi uppdate nó cg tự động lưu [ngày updata]

const Product = mongoose.model("Product", schemaProduct, "products"); //Kết nối tới collection có tên products

module.exports = Product;