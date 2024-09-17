//File thiết lập schema của product
const mongoose = require("mongoose");

const roomChatSchema = new mongoose.Schema({//Thiết lập schema
  title: String,
  avatar: String,
  typeRoom: String,
  status: String,
  users: [
    {
        user_id: String,
        role: String
    }
  ],
  deleted: {
    type: Boolean,
    default: false
  },
  deleteAt: Date
}, {timestamps: true});//Hàm mongoose nếu giá trị là true thì nó sẽ tự động lưu lại [ngày tạo] và khi uppdate nó cg tự động lưu [ngày updata]

const RoomChat = mongoose.model("RoomChat", roomChatSchema, "rooms-chat"); //Kết nối tới collection có tên products

module.exports = RoomChat;