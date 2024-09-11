const Users = require('../../models/user.model')

//[GET] /users/not-friend
module.exports.notFriend = async (req, res) => {
    const userId = res.locals.user.id

    const users = await Users.find({
      _id: { $ne: userId },//Khác user hiện tại not equal
      status: 'active',
      deleted: false
    }).select('id avatar fullName');

    res.render("client/pages/users/not-friend", {
      pageTitle: "Danh sách người dùng",
      users: users
    });
  };