const Product = require('../../models/product.model');
const filterStatusHelper = require('../../helpers/filterStatus');
const searchHelper = require('../../helpers/search');

// [GET] /admin/products
module.exports.index = async (req, res) => {
    
    const filterStatus = filterStatusHelper(req.query);  //Trả về một mảng chứa các trạng thái của sản phẩm

    let find = {                       //Tạo object dể tìm kiếm những sp chưa xóa
        deleted: false
    }

    if (req.query.status) {            //Có req.query.status có ngĩa là trên url có key tên status do frontend truyền lên url
        find.status = req.query.status //Thêm status vào oject find => find.status
    }

    const objectSearch = searchHelper(req.query);

    if(objectSearch.regex) {
        find.title = objectSearch.regex;
    }

    //Pagination
    let objectPagination = {
        currentPage: 1,
        limitItem: 4
    }

    if(req.query.page) {
        objectPagination.currentPage = parseInt(req.query.page);
    }

    objectPagination.skip = ((objectPagination.currentPage - 1) * objectPagination.limitItem);

    const countProducts = await Product.countDocuments(find); // Hàm count trong mongoose để tổng số sản phẩm
    const totalPage = Math.ceil(countProducts/objectPagination.limitItem);
    objectPagination.totalPage = totalPage;
    //End Pagination

    const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip);   //Dùng find(hàm của mongoose) để lọc các dữ liệu từ database

    res.render('admin/pages/product/index', {   //Truyền ngược các giá trị lại View
        pageTitle: 'Danh sản phẩm',
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}