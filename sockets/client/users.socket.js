const User = require('../../models/user.model')

module.exports = (res) => {
    const userId = res.locals.user.id
    const fullName = res.locals.user.fullName

    _io.once('connection', (socket) => {//Once khi load lại không lưu vào database
        socket.on('CLIENT_ADD_FRIEND', async (userId) => {
            const myUserId = res.locals.user.id;
            //Thêm id của A vào acceptFriends của B
            const existAinB = await User.findOne({
                _id: userId,
                acceptFriends: [myUserId]
            })

            if(!existAinB) {
                await User.updateOne({
                    _id: userId
                }, {
                    $push: {
                        acceptFriends: myUserId
                    }
                })
            }
            //Thêm id của B vào requestFriend của A  
            const existBinA = await User.findOne({
                _id: myUserId,
                requestFriends: [userId]
            })
            
            if(!existBinA) {
                await User.updateOne({
                    _id: myUserId
                }, {
                    $push: {
                        requestFriends: userId
                    }
                })
            }
        })
        socket.on('CLIENT_CANCEL_FRIEND', async (userId) => {
            const myUserId = res.locals.user.id;
            //Xóa id của A vào acceptFriends của B
            const existAinB = await User.findOne({
                _id: userId,
                acceptFriends: [myUserId]
            })

            if(existAinB) {
                await User.updateOne({
                    _id: userId
                }, {
                    $pull: {
                        acceptFriends: myUserId
                    }
                })
            }
            //Xóa id của B vào requestFriend của A  
            const existBinA = await User.findOne({
                _id: myUserId,
                requestFriends: [userId]
            })
            
            if(existBinA) {
                await User.updateOne({
                    _id: myUserId
                }, {
                    $pull: {
                        requestFriends: userId
                    }
                })
            }
        })
    })
}