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