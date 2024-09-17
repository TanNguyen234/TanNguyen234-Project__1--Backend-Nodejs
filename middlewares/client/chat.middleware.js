const RoomChat = require('../../models/rooms-chat.model')

module.exports.isAccess = async (req, res, next) => {
    const roomChat = req.params.roomChatId;
    const userId = res.locals.user.id;

    const existUserInRoomChat = await RoomChat.findOne({
        _id: roomChat,
        "users.user_id": userId,
        deleted: false
    })
    if(existUserInRoomChat) {
        next()
    } else {
        res.redirect('/')
    }
}