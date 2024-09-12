const Users = require('../../models/user.model')
const usersSocket = require('../../sockets/client/users.socket')

//[GET] /users/not-friend
module.exports.notFriend = async (req, res) => {
    const userId = res.locals.user.id
    //Socket
    usersSocket(res)
    //Socket

    const user = await Users.findOne({
      _id: userId
    });

    const requestFriends = user.requestFriends
    const acceptFriends = user.acceptFriends

    const users = await Users.find({
      $and: [                            //Từ khóa and kết hợp nhiều điều kiện
        { _id: { $ne: userId } },        //Khác user hiện tại not equal
        { _id: { $nin: requestFriends } },//not in trong 1 mảng còn not equal đối với 1
        { _id: { $nin: acceptFriends } }
      ],
      status: 'active',
      deleted: false
    }).select('id avatar fullName');

    res.render("client/pages/users/not-friend", {
      pageTitle: "Danh sách người dùng",
      users: users
    });
  };