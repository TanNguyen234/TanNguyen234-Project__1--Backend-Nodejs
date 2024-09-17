const Chat = require('../../models/chat.model')
const User = require('../../models/user.model')

const chatSocket = require('../../sockets/client/chat.socket')

//[GET] /chat/:room_chat_id
module.exports.index = async (req, res) => {
    const roomChatId = req.params.roomChatId;
    //socket
    chatSocket(req, res);
    //End Socket
    //Lấy chat từ database
    const chats = await Chat.find({
        room_chat_id: roomChatId,
        deleted: false
    })
    
    for (const chat of chats) {
        const infoUser = await User.findOne({
            _id: chat.user_id
        }).select('fullName')

        chat.infoUser = infoUser
    }
    //End Lấy chat từ database

    res.render('client/pages/chat/index.pug', {
        titlePage: 'Chat',
        chats: chats || []
    })
}