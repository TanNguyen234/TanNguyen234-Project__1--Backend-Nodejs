//Change Status
const buttonsChangeStatus = document.querySelectorAll('[button-change-status]');

if(buttonsChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path")

    buttonsChangeStatus.forEach(button => {
        button.addEventListener('click', () => {
            const statusCurrent = button.getAttribute('data-status');
            const id = button.getAttribute('data-id');

            let statusChange = statusCurrent == "active" ? "inactive" : "active";

            const action = path + `/${statusChange}/${id}?_method=PATCH`;//Dùng library method-override để chuẩn là method=POST  

            formChangeStatus.action = action; //Thuộc tính có sẵn nên gán kiểu này được không thì sài setAttribute

            formChangeStatus.submit(); //Hàm hỗ trợ gửi form gửi cái action trong form
        })
    })
}
//End Change Status

//Delete Product
const buttonsDelete = document.querySelectorAll('[button-delete]');

if(buttonsDelete.length > 0) {
    const formDeleteItem = document.querySelector('#form-delete-item');
    const path = formDeleteItem.getAttribute("data-path");

    buttonsDelete.forEach(button => {
        button.addEventListener('click', () => {

            const isConfirm = confirm("Are you sure you want to delete this product?");
            
            if(isConfirm) {
                const id = button.getAttribute('data-id');

                formDeleteItem.action = `${path}/${id}?_method=DELETE`; 
                
                formDeleteItem.submit();
            }
        })
    })
}
//End Delete Product