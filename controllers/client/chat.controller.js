//[GET] /chat/
module.exports.index = (req, res) => {
    //Socket
    _io.on('connection', (socket) => {
        console.log('a user connected',socket.id);
    })
    //End Socket    

    res.render('client/pages/chat/index.pug', {
        titlePage: 'Chat'
    })
}