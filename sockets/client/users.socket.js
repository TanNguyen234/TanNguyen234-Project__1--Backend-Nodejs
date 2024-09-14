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

            //Lấy ra độ dài acceptFriends mới của B và trả về cho B
            const infoUserB = await User.findOne({
                _id: userId
            })
            const lengthAcceptFriends = infoUserB.acceptFriends.length;
            socket.broadcast.emit('SERVER_RETURN_LENGTH_ACCEPTFRIENDS', {
                userId: userId,
                lengthAcceptFriends: lengthAcceptFriends
            })
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
        socket.on('CLIENT_REFUSE_FRIEND', async (userId) => {
            const myUserId = res.locals.user.id;
            //Xóa id của A trong acceptFriends của B
            const existAinB = await User.findOne({
                _id: myUserId,
                acceptFriends: [userId]
            })

            if(existAinB) {
                await User.updateOne({
                    _id: myUserId
                }, {
                    $pull: {
                        acceptFriends: userId
                    }
                })
            }
            //Xóa id của B trong requestFriend của A  
            const existBinA = await User.findOne({
                _id: userId,
                requestFriends: [myUserId]
            })
            
            if(existBinA) {
                await User.updateOne({
                    _id: userId
                }, {
                    $pull: {
                        requestFriends: myUserId
                    }
                })
            }
        })
        socket.on('CLIENT_ACCEPT_FRIEND', async (userId) => {
            const myUserId = res.locals.user.id;
            //Xóa id của A trong acceptFriends của B
            //Thêm {user_id, room_chat_id} của A trong friendList của B
            const existAinB = await User.findOne({
                _id: myUserId,
                acceptFriends: [userId]
            })

            if(existAinB) {
                await User.updateOne({
                    _id: myUserId
                }, {
                    $pull: {
                        acceptFriends: userId
                    },
                    $push: {
                        friendList: {
                            user_id: userId,
                            room_chat_id: ''
                        }
                    }
                })
            }
            //Xóa id của B trong requestFriend của A 
            //Thêm {user_id, room_chat_id} của B trong friendList của A
            const existBinA = await User.findOne({
                _id: userId,
                requestFriends: [myUserId]
            })
            
            if(existBinA) {
                await User.updateOne({
                    _id: userId
                }, {
                    $pull: {
                        requestFriends: myUserId
                    },
                    $push: {
                        friendList: {
                            user_id: myUserId,
                            room_chat_id: ''
                        }
                    }
                })
            }
        })
    })
}