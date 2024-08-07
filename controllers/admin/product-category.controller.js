const ProductCategory = require('../../models/product-category.model.js');

const systemConfig = require('../../config/system');

// [GET] /amin/product-category
module.exports.index = async (req, res) => {
    
    let find = {
        deleted: false
    }

    const records = await ProductCategory.find(find)

    res.render('admin/pages/product-category/index', {   //Truyền ngược các giá trị lại View
        pageTitle: 'Danh mục sản phẩm',
        records: records,
    })
}

// [GET] /amin/product-category/create
module.exports.create = async (req, res) => {
    res.render('admin/pages/product-category/create', {   //Truyền ngược các giá trị lại View
        pageTitle: 'Tạo danh mục sản phẩm',
    })
}

// [POST] /amin/product-category/create
module.exports.createPost = async (req, res) => {
    
    if(req.body.position == '') {
        const count = await ProductCategory.countDocuments();
        req.body.position = count + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    const record = new ProductCategory(req.body);
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/product-category`)
}