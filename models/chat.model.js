const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({//Thiết lập schema
  user_id: String,
  room_chat_id: String,
  content: String,
  images: Array,
  deleted: {
    type: Boolean,
    default: false
  },
  deleteAt: Date
}, {timestamps: true});//Hàm mongoose nếu giá trị là true thì nó sẽ tự động lưu lại [ngày tạo] và khi uppdate nó cg tự động lưu [ngày updata]

const Chat = mongoose.model("Chat", chatSchema, "chats"); //Kết nối tới collection có tên products

module.exports = Chat;