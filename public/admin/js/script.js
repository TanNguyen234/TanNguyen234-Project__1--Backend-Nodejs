//Button Status
const buttonStatus = document.querySelectorAll("[button-status]");
if(buttonStatus.length > 0) {

    let url = new URL(window.location.href); //Ghi new URL mới sử dụng được các hàm set bên dưới

    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            button.classList.toggle("active")
            const status = button.getAttribute("button-status");//Lấy ra thuộc tính button-status của button bị click
            
            if(status){
                url.searchParams.set("status", status);  //Thêm param status
            } else {
                url.searchParams.delete("status"); //Xóa param status
            }
            console.log(url.href);
            window.location.href = url.href;  //Chuyển trang hiện tại đến đường dẫn mới
        })
    })
}
//End Button Status

// Form Search 
const formSearch = document.querySelector('#form-search');
if (formSearch) {

    let url = new URL(window.location.href);

    formSearch.addEventListener('submit', (e) => {
        e.preventDefault();

        const keyword = e.target.elements.keyword.value;

        if(keyword){
            url.searchParams.set("keyword", keyword);  //Thêm param status
        } else {
            url.searchParams.delete("keyword"); //Xóa param status
        }

        window.location.href = url;
    })
}
// End Form Search  

//Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if(buttonsPagination) {
    let url = new URL(window.location.href);

    buttonsPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            console.log(page);

            url.searchParams.set("page", page);

            window.location.href = url.href;  //Chuyển trang hiện tại đến đường dẫn mới
        })
    })
}
//End Pagination

//Checkbox Multi
const checkboxMulti = document.querySelector('[checkbox-multi]')

if(checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")
    
    const inputsId = checkboxMulti.querySelectorAll('input[name="ids"]')
    
    inputCheckAll.addEventListener('click', () => {
        
        if(inputCheckAll.checked) {
            inputsId.forEach(input => {
                input.checked = true
            })
        } else {
            inputsId.forEach(input => {
                input.checked = false
            })
        }
    })

    inputsId.forEach(input => {
        input.addEventListener('click', () => {
            const countChecked = checkboxMulti.querySelectorAll('input[name="ids"]:checked').length;
            
            if(countChecked == inputsId.length) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
        })
    })
 
}
//End Checkbox Multi

//Form Change Multi
const formChangeMulti = document.querySelector('[form-change-multi]');

if(formChangeMulti) {
    formChangeMulti.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const checkboxMulti = document.querySelector('[checkbox-multi]');
        const inputsChecked = checkboxMulti.querySelectorAll('input[name="ids"]:checked');

        const typeChange = e.target.elements.type.value;  //Kiểm tra giá trị của typeChange để xử lý theo yêu cầu của bạn    
        
        if(typeChange == "delete-all") {
            const isConfirm = confirm("Are you sure you want to delete");

            if(!isConfirm) {
                return;
            }
        }

        if(inputsChecked.length > 0) {
            let ids = [];
            const inputIds = formChangeMulti.querySelector('input[name="ids"]');
            
            inputsChecked.forEach(input => {
                const id = input.value;

                if(typeChange == "change-position") {
                    const position = input.closest('tr').querySelector('input[name="position"]').value;//input.closest('tr') là đi ra thẻ cha "tr" gần nhât
                    
                    ids.push(`${id}-${position}`);
                } else {
                    ids.push(input.defaultValue);
                }
               
            })

            inputIds.value = ids.join(', ') //Vì giá trị của input không thể là array nên convert thành string

            formChangeMulti.submit(); //Submit form
        } else {
            alert("Vui lòng chọn ít nhất một bản ghi")
        }
    })   
}
//End Change Form Multi

// Show Alert 
const showAlert = document.querySelector('[show-alert]');

if(showAlert) {
    const time = showAlert.getAttribute('data-time');

    setTimeout(() =>{
        showAlert.classList.add('alert-hidden');
    }, time)

    var closeAlert = showAlert.querySelector('[close-alert]');
}

if(closeAlert) {
    closeAlert.addEventListener('click', () => {
        showAlert.classList.add('alert-hidden');
    })
}
// End Show Alert 

//Upload Image //Tạo preview ảnh trước khí upload [(google search)]
const uploadImage = document.querySelector('[upload-image]');

if(uploadImage) {
    const uploadImageInput = uploadImage.querySelector('[upload-image-input]');
    const uploadImagePreview = uploadImage.querySelector('[upload-image-preview]');
    const update = document.querySelector('[update]');

    uploadImageInput.addEventListener('change', (e) => {

        uploadImage.children[2].style.display = 'flex';
        const x = uploadImage.children[2].children[1];
        let file = e.target.files[0];
        
        if(file) {
            uploadImagePreview.src = URL.createObjectURL(file)//Hàm tạo đường dẫn ảnh
        }

        x.addEventListener('click', (e) => {
            console.log("x");
            uploadImagePreview.src = ""
            uploadImage.children[2].style.display = 'none';
            uploadImageInput.value = "";
        })
    })
}
//End Upload Image
//Sort
const sort = document.querySelector('[sort]');
if(sort) {
    const select = document.querySelector('[sort-select]');
    const buttonSortClear = document.querySelector('[sort-clear]');

    let url = new URL(window.location.href);

    select.addEventListener('change', (e) => {
       const [sortKey, sortValue] = e.target.value.split('-')
       
       url.searchParams.set("sortKey", sortKey);
       url.searchParams.set("sortValue", sortValue);

       window.location.href = url.href
    });

    buttonSortClear.addEventListener('click', () => {
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");     
        
        window.location.href = url.href
    })

    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");

    if(sortKey && sortValue) {
        const string = `${sortKey}-${sortValue}`;
        const option = select.querySelector(`option[value="${string}"]`);
        option.selected = true;
    }
}
//End Sort