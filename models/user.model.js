//File thiết lập schema của product
const mongoose = require("mongoose");
const generate = require('../helpers/generate');

const usersSchema = new mongoose.Schema({//Thiết lập schema
  fullName: String,
  email: String,
  password: String,
  tokenUser: {
    type: String,
    default: generate.generateRandomString(20)
  },
  phone: String,
  avatar: String,
  status: {
    type: String,
    default: "active"
  },
  requestFriends: Array, //Lời mời kb
  acceptFriends: Array, //Lời mời kb đã gửi
  friendList: [         //Danh sác1h bạn bè
    {
      user_id: String,
      room_chat_id: String,
    }
  ],
  deleted: {
    type: Boolean,
    default: false
  },
  deleteAt: Date
}, {timestamps: true});//Hàm mongoose nếu giá trị là true thì nó sẽ tự động lưu lại [ngày tạo] và khi uppdate nó cg tự động lưu [ngày updata]

const Users = mongoose.model("Users", usersSchema, "users"); //Kết nối tới collection có tên products

module.exports = Users;