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