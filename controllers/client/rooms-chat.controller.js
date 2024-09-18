const RoomChat = require("../../models/rooms-chat.model");
const User = require("../../models/user.model");

const chatSocket = require("../../sockets/client/chat.socket");

//[GET] /rooms-chat/
module.exports.index = async (req, res) => {
  const userId = res.locals.user.id;

  const rooms = await RoomChat.find({
    typeRoom: 'group',
    "users.user_id": userId,
    deleted: false
  })

  res.render("client/pages/rooms-chat/index.pug", {
    titlePage: "Rooms Chat",
    rooms: rooms
  });
};

//[GET] /rooms-chat/create
module.exports.create = async (req, res) => {
  const friendList = res.locals.user.friendList;

  for (const friend of friendList) {
    const infoFriend = await User.findOne({
      _id: friend.user_id,
      deleted: false,
    }).select("fullName avatar");

    friend.infoFriend = infoFriend;
  }

  res.render("client/pages/rooms-chat/create.pug", {
    titlePage: "Tạo phòng",
    friendList: friendList,
  });
};

//[POST] /rooms-chat/createPost
module.exports.createPost = async (req, res) => {
  const title = req.body.title;
  const userIds = req.body.user_id;

  const dataRoom = {
    title: title,
    typeRoom: 'group',
    users: []
  };

  for (const userId of userIds) {
    dataRoom.users.push({
        user_id: userId,
        role: 'user'
    });
  }

  dataRoom.users.push({
    user_id: res.locals.user.id,
    role: 'superAdmin'
  });
  
  const roomChat = new RoomChat(dataRoom)
  await roomChat.save()

  res.redirect(`/chat/${roomChat.id}`)
};
