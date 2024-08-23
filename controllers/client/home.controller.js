const Product = require('../../models/product.model');
const productsHelper = require('../../helpers/products');

//[GET] /
module.exports.index = async (req, res) => {//Tên hàm controller ở đây là index là file chính của home
    const productsFeatured = await Product.find({
        status: 'active',
        deleted: false,
        featured: '1'
    }).limit(6);

    const newProducts = productsHelper.newPriceProducts(productsFeatured)

    res.render('client/pages/home/index', {
        pageTitle: 'Trang chủ',
        productsFeatured: newProducts,
    });//Đây là file controller dc navigate đến sau khi đúng route
}