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
const refuseFriend = (button) => {
    button.addEventListener('click', () => {
        button.closest('.box-user').classList.add('refuse')
        const userId = button.getAttribute('btn-refuse-friend');
        socket.emit('CLIENT_REFUSE_FRIEND', userId)
    })
}
const listBtnRefuseFriends = document.querySelectorAll('[btn-refuse-friend]')
if(listBtnRefuseFriends.length > 0) {
    listBtnRefuseFriends.forEach(btn => {
        refuseFriend(btn);
    })
}
//End Chức năng từ chổi yêu cầu
//Chức năng chấp nhận yêu cầu
const acceptFriend = (button) => {
    button.addEventListener('click', () => {
        button.closest('.box-user').classList.add('accept')
        const userId = button.getAttribute('btn-accept-friend');
        socket.emit('CLIENT_ACCEPT_FRIEND', userId)
    })
}
const listBtnAcceptFriends = document.querySelectorAll('[btn-accept-friend]')
if(listBtnAcceptFriends.length > 0) {
    listBtnAcceptFriends.forEach(btn => {
        acceptFriend(btn);
    })
}
//End Chức năng chấp nhận yêu cầu

//SERVER_RETURN_LENGTH_ACCEPTFRIENDS
const badgeUserAccept = document.querySelector('[badge-users-accept]')
if(badgeUserAccept) {
    const id = badgeUserAccept.getAttribute('badge-users-accept')
    socket.on('SERVER_RETURN_LENGTH_ACCEPTFRIENDS', (data) => {
        if(id == data.userId) {
            badgeUserAccept.innerHTML = data.lengthAcceptFriends;
        }
    })
}
//End SERVER_RETURN_LENGTH_ACCEPTFRIENDS
//SERVER_RETURN_INFO_ACCEPTFRIENDS
const dataUserAccept = document.querySelector('div[data-users-accept]')
if(dataUserAccept) {
    const userId = dataUserAccept.getAttribute('data-users-accept');

    socket.on('SERVER_RETURN_INFO_ACCEPTFRIENDS', (data) => {
        if(userId === data.userId) {
            //Vẽ user ra giao diện
            const div = document.createElement('div');
            div.classList.add('col-6')
            div.setAttribute('user-id', data.infoUserA._id)
            
            //Phải innerHtml để gián tiếp rồi mới appendChild nếu không sẽ bị lỗi
            div.innerHTML = `
                <div class='box-user'>
                    <div class='inner-avatar'>
                      <img src=${data.infoUserA.avatar ? data.infoUserA.avatar : '/images/avatar.png'} 
                        alt=${data.infoUserA.fullName}/>
                    </div>
                    <div class='inner-info'>
                        <div class='inner-name'> ${data.infoUserA.fullName} </div>
                        <div class='inner-buttons'> 
                            <button class='btn btn-sm btn-primary mr-1' btn-accept-friend=${data.infoUserA._id}> Chấp nhận </button>
                            <button class='btn btn-sm btn-secondary mr-1' btn-refuse-friend=${data.infoUserA._id}> Xóa </button>
                            <button(class='btn btn-sm btn-secondary mr-1' btn-deleted-friend disabled> Đã xóa </button>
                            <button(class='btn btn-sm btn-primary mr-1' btn-accepted-friend disabled> Đã chấp nhận </button>
                        </div>
                    </div>
                </div>
            `
            dataUserAccept.appendChild(div);

            //Hủy lời mời kết bạn (add js cho button refuse mới tạo)
            const btnRefuse = div.querySelector('[btn-refuse-friend]')
            console.log(btnRefuse)
            refuseFriend(btnRefuse)

            //Chấp nhận lời mời kết bạn (add js cho button accept mới tạo)
            const btnAccept = div.querySelector('[btn-accept-friend]')
            console.log(btnAccept)
            acceptFriend(btnAccept)
        }
    })
}
//End SERVER_RETURN_INFO_ACCEPTFRIENDS
// SERVER_RETURN_USER_ID_CANCEL_FRIEND
socket.on('SERVER_RETURN_USER_ID_CANCEL_FRIEND', (data) => {
    const userIdB = dataUserAccept.getAttribute('data-users-accept');
   if(userIdB == data.userIdB) {
        const boxUserRemove = document.querySelector(`[user-id='${data.userIdA}']`)
        if(boxUserRemove) {
        const dataUserAccept = document.querySelector('div[data-users-accept]')
        dataUserAccept.removeChild(boxUserRemove)
        }
   }
})
//End SERVER_RETURN_USER_ID_CANCEL_FRIEND