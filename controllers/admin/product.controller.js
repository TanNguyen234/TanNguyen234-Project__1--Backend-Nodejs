const Product = require('../../models/product.model');

// [GET] /admin/products
module.exports.index = async (req, res) => {
    
    let filterStatus = [                  //Tạo bộ lộc trang thái để thêm class active cho nó để nó có tính navigate
        {
            name: "Tất cả",
            status: "",
            class: ""    
        },
        {
            name: "Hoạt động",
            status: "active",
            class: "" 
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ]

    if(req.query.status) {                   //Nếu url có key tên status
        const index = filterStatus.findIndex(item => item.status == req.query.status);//Tìm index trong object filterStatus phần tử mà có giá trị giống giá trị của status trên url
        filterStatus[index].class = "active";                                        //Cho phần tử có giá tri giống trên key url class là active
    } else {
        const index = filterStatus.findIndex(item => item.status == '');             //Ngược lại nếu không có key status trên url  thì tìm phần tử có status="" trong filterStatus 
        filterStatus[index].class = "active";                                        // Có nghĩ là item có status.name="Tất cả" có class="active"
    }

    let find = {                       //Tạo object dể tìm kiếm những sp chưa xóa
        deleted: false
    }

    if (req.query.status) {            //Có req.query.status có ngĩa là trên url có key tên status do frontend truyền lên url
        find.status = req.query.status //Thêm status vào oject find => find.status
    }

    let keyword = "";

    if (req.query.keyword) {           //Chức năng tìm kiếm
        keyword = req.query.keyword;

        const regex = new RegExp(keyword, "i");
        find.title = regex;
    }

    const products = await Product.find(find)   //Dùng find để lọc các dữ liệu từ database

    res.render('admin/pages/product/index', {   //Truyền ngược các giá trị lại View
        pageTitle: 'Danh sản phẩm',
        products: products,
        filterStatus: filterStatus,
        keyword: keyword
    })
}