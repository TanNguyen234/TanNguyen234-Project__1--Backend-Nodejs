const Chat = require('../../models/chat.model')
const User = require('../../models/user.model')

const uploadToCloudinary = require('../../helpers/uploadToCloudinary');

//[GET] /chat/
module.exports.index = async (req, res) => {
    const userId = res.locals.user.id
    const fullName = res.locals.user.fullName
    //Socket
    _io.once('connection', (socket) => {//Once khi load lại không lưu vào database
        socket.on('CLIENT_SEND_MESSAGE', async (data) => {
            let images = []

            for (const imageBuffer of data.images) {
                const link = await uploadToCloudinary.uploadToCloudinary(imageBuffer)
                images.push(link)
            }

            const chat = new Chat({
                user_id: userId,
                content: data.content,
                images: images
            })

            await chat.save()

            _io.emit('SERVER_RETURN_MESSAGE', {
                user_id: userId,
                fullName: fullName,
                content: data.content,
                images: images
            })
        })

        //Typing
        socket.on('CLIENT_SEND_TYPING', (type) => {
            socket.broadcast.emit('SERVER_RETURN_TYPING', {
                user_id: userId,
                fullName: fullName,
                type: type
            })
        })
        //End Typing
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

        chat.infoUser = infoUser
    }
    //End Lấy chat từ database

    res.render('client/pages/chat/index.pug', {
        titlePage: 'Chat',
        chats: chats
    })
}