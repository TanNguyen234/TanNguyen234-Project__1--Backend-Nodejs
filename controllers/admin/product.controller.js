const Product = require('../../models/product.model');
const filterStatusHelper = require('../../helpers/filterStatus');
const searchHelper = require('../../helpers/search');
const paginationHelper = require('../../helpers/pagination');

const systemConfig = require('../../config/system');

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

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    // await Product.deleteOne({ _id: id });
    await Product.updateOne({ _id: id }, { deleted: true , deleteAt: new Date() });

    req.flash("success", `Đã xóa thành công 1 sản phẩm`);

    res.redirect("back");
}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
    res.render('admin/pages/product/create', {
        pageTitle: 'Thêm mới sản phẩm'
    })
}

// [POST] /admin/products/createPost
module.exports.createPost = async (req, res) => {
    
    if(!req.body.title) { //Validate
        req.flash("error", `Vui lòng nhập tiêu đề!`);
        res.redirect("back");
        return; //Để không chạy đoạn code bên dưới mặc dù đã redirect
    }

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    
    if(req.body.position == '') {
       const countProduct = await Product.countDocuments();
       req.body.position = countProduct + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    if(req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    const product = new Product(req.body);
    await product.save();

    res.redirect(`${systemConfig.prefixAdmin}/products`)
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
       const find = {
        deleted: false,
        _id: req.params.id
       }

       const product = await Product.findOne(find);

       res.render('admin/pages/product/edit', {
        pageTitle: 'Chỉnh sửa sản phẩm',
        product: product
       })
    } catch (err) {
        req.flash("error", "Sản phẩm không tồn tại");
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {//Try catch khi update, ...
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    if(!req.body.position) {
        const countProduct = await Product.countDocuments();
        req.body.position = countProduct + 1;
    }

    if(req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    try {
        await Product.updateOne({ _id : req.params.id}, req.body);//Vì req.body là object nen truyen thẳng vào
        req.flash("success" , "Sản phẩm đã được cập nhật!");
    } catch (error) {
        req.flash("error", "Cập nhật sản phẩm thất bại");
    }

    res.redirect(`back`)
}