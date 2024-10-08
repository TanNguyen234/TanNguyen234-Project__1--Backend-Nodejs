const Product = require('../../models/product.model');
const Account = require('../../models/accounts.model');
const ProductCategory = require('../../models/product-category.model');

const filterStatusHelper = require('../../helpers/filterStatus');
const searchHelper = require('../../helpers/search');
const paginationHelper = require('../../helpers/pagination');
const treeHelper = require('../../helpers/createTree');

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

    //Sort
    let sort = {

    }

    if (req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue
    } else {
      sort.position = "desc"
    }
    //End Sort

    const products = await Product.find(find)
     .sort(sort)
     .limit(objectPagination.limitItem)
     .skip(objectPagination.skip);   //Dùng find(hàm của mongoose) để lọc các dữ liệu từ database
    
    for (const product of products) {
        //Lấy ra thông tin người tạo
        const userCreated = await Account.findOne({
            _id: product.createdBy.account_id
        })

        if(userCreated) {
            product.accountFullName = userCreated.fullName
        }
        
        //Lấy ra thông tin người cập nhật gần nhất
        const updatedBy = product.updatedBy[product.updatedBy.length - 1]
        //không sao chép dữ liệu mà thay vào đó tạo một tham chiếu (reference) đến đối tượng
        //nên updatedBy và product.updatedBy[product.updatedBy.length - 1] trỏ đến cùng bộ nhớ và giá trị 
        //khi một trong 2 thay đổi cái còn lại cũng thay đổi theo 
        
        if(updatedBy) {
            const userUpdated = await Account.findOne({
                _id: updatedBy.account_id
            })

            updatedBy.accountFullName = userUpdated.fullName
        }
    }

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
    const status = req.params.status;
    const id = req.params.id;

    const updated = {
        account_id: res.locals.user.id,
        update_at: new Date()
    }

    await Product.updateOne({ _id: id }, { 
        status: status,
        $push: {updatedBy: updated}
    })//Do id trong database là _id nên ghi _id và updateOne là hàm mongoose
    
    req.flash("success", "Sản phẩm đã được cập nhật trạng thái ! ");

    // res.redirect("/admin/products");//Hàm express để chuyển hướng
    res.redirect("back");
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {

    const type = req.body.type;

    const ids = req.body.ids.split(', '); //conver từ string thành array

    const updated = {
        account_id: res.locals.user.id,
        update_at: new Date()
    }

    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { 
                status: "active", 
                $push: {updatedBy: updated}
            })

            req.flash("success", `Đã cập nhật thành công trạng thái của ${ids.length} sản phẩm`);

            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { 
                status: "inactive", 
                $push: {updatedBy: updated}
            })

            req.flash("success", `Đã cập nhật thành công trạng thái của ${ids.length} sản phẩm`);

            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } }, {deleted: true, deletedBy: {
                account_id: res.locals.user.id,
                delete_at: new Date()
            } } )

            req.flash("success", `Đã xóa thành công ${ids.length} sản phẩm`);
            break;
        case "change-position":
            for (const item of ids) {

               let [id, position] = item.split('-');
               position = parseInt(position);

               await Product.updateOne({ _id: id }, { 
                position: position, 
                $push: {updatedBy: updated}
               });
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
    await Product.updateOne({ _id: id }, {deleted: true, deletedBy: {
        account_id: res.locals.user.id,
        delete_at: new Date()
    } });

    req.flash("success", `Đã xóa thành công 1 sản phẩm`);

    res.redirect("back");
}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
    const categories = await ProductCategory.find({
        deleted: false
    });

    const newCategories = treeHelper.tree(categories)

    res.render('admin/pages/product/create', {
        pageTitle: 'Thêm mới sản phẩm',
        categories: newCategories
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

    req.body.createdBy = {
        account_id: res.locals.user.id
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
       const categories = await ProductCategory.find({
        deleted: false
       });

        const newCategories = treeHelper.tree(categories)

       res.render('admin/pages/product/edit', {
        pageTitle: 'Chỉnh sửa sản phẩm',
        product: product,
        categories: newCategories,
        parent_id: product.product_category_id
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
        const updated = {
            account_id: res.locals.user.id,
            update_at: new Date()
        }

        await Product.updateOne({ _id : req.params.id}, {
            ...req.body,
            $push: {updatedBy: updated},//Từ khóa $push của mongoose giúp update push vào
        });//Vì req.body là object nen truyen thẳng vào

        req.flash("success" , "Sản phẩm đã được cập nhật!");
    } catch (error) {
        req.flash("error", "Cập nhật sản phẩm thất bại");
    }

    res.redirect(`back`)
}

// [GET] /admin/products/detail/:id

module.exports.detail = async (req, res) => {
    try {
        const find = {
         deleted: false,
         _id: req.params.id
        }
 
        const product = await Product.findOne(find);
        console.log(product)
 
        res.render('admin/pages/product/detail', {
         pageTitle: product.title,
         product: product
        })
     } catch (err) {
         req.flash("error", "Sản phẩm không tồn tại");
         res.redirect(`${systemConfig.prefixAdmin}/products`)
     }
}