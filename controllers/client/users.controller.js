const Users = require("../../models/user.model");
const usersSocket = require("../../sockets/client/users.socket");

//[GET] /users/not-friend
module.exports.notFriend = async (req, res) => {
  const userId = res.locals.user.id;
  //Socket
  usersSocket(res);
  //Socket

  const user = await Users.findOne({
    _id: userId,
  });

  const requestFriends = user.requestFriends;
  const acceptFriends = user.acceptFriends;

  const friendList = [];
  user.friendList.forEach((friend) => {
    friendList.push(friend.user_id);
  });

  const users = await Users.find({
    $and: [
      //Từ khóa and kết hợp nhiều điều kiện
      { _id: { $ne: userId } }, //Khác user hiện tại not equal
      { _id: { $nin: requestFriends } }, //not in trong 1 mảng còn not equal đối với 1
      { _id: { $nin: acceptFriends } },
      { _id: { $nin: friendList } }
    ],
    status: "active",
    deleted: false,
  }).select("id avatar fullName");

  res.render("client/pages/users/not-friend", {
    pageTitle: "Danh sách người dùng",
    users: users,
  });
};

//[GET] /users/request
module.exports.request = async (req, res) => {
  const userId = res.locals.user.id;
  //Socket
  usersSocket(res);
  //Socket

  const user = await Users.findOne({
    _id: userId,
  });

  const requestFriends = user.requestFriends;

  const users = await Users.find({
    _id: { $in: requestFriends },
    status: "active",
    deleted: false,
  }).select("id avatar fullName");

  res.render("client/pages/users/request", {
    titlePage: "Lời mời đã gửi",
    users: users,
  });
};

//[GET] /users/accept
module.exports.accept = async (req, res) => {
  const userId = res.locals.user.id;
  //Socket
  usersSocket(res);
  //Socket

  const user = await Users.findOne({
    _id: userId,
  });

  const acceptFriends = user.acceptFriends;

  const users = await Users.find({
    _id: { $in: acceptFriends },
    status: "active",
    deleted: false,
  }).select("id avatar fullName");

  res.render("client/pages/users/accept", {
    titlePage: "Lời mời kết bạn",
    users: users,
  });
};

//[GET] /users/friends
module.exports.friends = async (req, res) => {
  const userId = res.locals.user.id;
  //Socket
  usersSocket(res);
  //Socket

  const user = await Users.findOne({
    _id: userId,
  });

  const friendList = user.friendList;
  
  const listFriendId = friendList.map(item => item.user_id)

  const users = await Users.find({
    _id: { $in: listFriendId },
    status: "active",
    deleted: false,
  }).select("id avatar fullName statusOnline");

  for (const user of users) {
    const infoFriend = friendList.find(friend => friend.user_id === user.id)
    user.infoFriend = infoFriend
  }

  res.render("client/pages/users/friends", {
    titlePage: "Danh sách bạn bè",
    users: users,
  });
};
