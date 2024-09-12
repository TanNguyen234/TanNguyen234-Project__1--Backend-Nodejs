//Chức năng gửi yêu cầu
const listBtnAddFriends = document.querySelectorAll('[btn-add-friend]')
if(listBtnAddFriends.length > 0) {
    listBtnAddFriends.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.box-user').classList.add('add')
            const userId = btn.getAttribute('btn-add-friend');
            socket.emit('CLIENT_ADD_FRIEND', userId)
        })
    })
}
//End Chức năng gửi yêu cầu
//Chức năng hủy yêu cầu
const listBtnCancelFriends = document.querySelectorAll('[btn-cancel-friend]')
if(listBtnCancelFriends.length > 0) {
    listBtnCancelFriends.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.box-user').classList.remove('add')
            const userId = btn.getAttribute('btn-cancel-friend');
            socket.emit('CLIENT_CANCEL_FRIEND', userId)
        })
    })
}
//End Chức năng hủy yêu cầu
//Chức năng từ chối yêu cầu
const listBtnRefuseFriends = document.querySelectorAll('[btn-refuse-friend]')
if(listBtnRefuseFriends.length > 0) {
    listBtnRefuseFriends.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.box-user').classList.add('refuse')
            const userId = btn.getAttribute('btn-refuse-friend');
            socket.emit('CLIENT_REFUSE_FRIEND', userId)
        })
    })
}
//End Chức năng từ chổi yêu cầu