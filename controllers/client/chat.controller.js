const Chat = require('../../models/chat.model')
const User = require('../../models/user.model')

//[GET] /chat/
module.exports.index = async (req, res) => {
    const userId = res.locals.user.id
    //Socket
    _io.once('connection', (socket) => {//Once khi load lại không lưu vào database
        socket.on('CLIENT_SEND_MESSAGE', async (content) => {
            const chat = new Chat({
                user_id: userId,
                content: content
            })

            await chat.save()
        })
    })
    //End Socket    
    //Lấy chat từ database
    const chats = await Chat.find({
        deleted: false,
    })
    
    for (const chat of chats) {
        const infoUser = await User.findOne({
            _id: chat.user_id
        }).select('fullName')
        console.log(infoUser)

        chat.infoUser = infoUser
        console.log(chat.infoUser.fullName)
    }
    //End Lấy chat từ database

    res.render('client/pages/chat/index.pug', {
        titlePage: 'Chat',
        chats: chats
    })
}