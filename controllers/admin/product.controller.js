const Product = require('../../models/product.model');
const filterStatusHelper = require('../../helpers/filterStatus');
const searchHelper = require('../../helpers/search');
const paginationHelper = require('../../helpers/pagination');

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

    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }

    //Pagination
    const countProducts = await Product.countDocuments(find); // Hàm count trong mongoose để tổng số sản phẩm

    let objectPagination = paginationHelper({
        currentPage: 1,
        limitItem: 4
    }, req.query, countProducts)

    const products = await Product.find(find)
     .sort( { position: "desc" } )
     .limit(objectPagination.limitItem)
     .skip(objectPagination.skip);   //Dùng find(hàm của mongoose) để lọc các dữ liệu từ database

    res.render('admin/pages/product/index', {   //Truyền ngược các giá trị lại View
        pageTitle: 'Danh sản phẩm',
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}

// [PATCH] /admin/products/change-status/:status/:id  
module.exports.changeStatus = async (req, res) => {
    console.log(req.params);        //Chứa các routes động

    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({ _id: id }, { status: status })//Do id trong database là _id nên ghi _id và updateOne là hàm mongoose
    
    req.flash("success", "Sản phẩm đã được cập nhật trạng thái ! ");

    // res.redirect("/admin/products");//Hàm express để chuyển hướng
    res.redirect("back");
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(', '); //conver từ string thành array

    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" })

            req.flash("success", `Đã cập nhật thành công trạng thái của ${ids.length} sản phẩm`);

            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" })

            req.flash("success", `Đã cập nhật thành công trạng thái của ${ids.length} sản phẩm`);

            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } }, { deleted: true , deleteAt: new Date() })

            req.flash("success", `Đã xóa thành công ${ids.length} sản phẩm`);
            break;
        case "change-position":
            for (const item of ids) {

               let [id, position] = item.split('-');
               position = parseInt(position);

               await Product.updateOne({ _id: id }, { position: position });
            }
            req.flash("success", `Đã thay đổi thành công vị trí của ${ids.length} sản phẩm`);
            break;
        default:
            break;
    }

    res.redirect("back");
}
//[DELETE] /admin/products/delete/:id

module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    // await Product.deleteOne({ _id: id });
    await Product.updateOne({ _id: id }, { deleted: true , deleteAt: new Date() });

    req.flash("success", `Đã xóa thành công 1 sản phẩm`);

    res.redirect("back");
}