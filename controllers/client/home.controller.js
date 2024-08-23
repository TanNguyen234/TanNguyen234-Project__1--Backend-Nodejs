const Product = require('../../models/product.model');
const productsHelper = require('../../helpers/products');

//[GET] /
module.exports.index = async (req, res) => {//Tên hàm controller ở đây là index là file chính của home
    //Lấy ra sp nổi bật
    const productsFeatured = await Product.find({
        status: 'active',
        deleted: false,
        featured: '1'
    }).limit(6);

    const newProducts = productsHelper.newPriceProducts(productsFeatured)
    //Hết lấy ra sp nổi bật

    //Lấy ra sp mới nhất
    const lastestProducts = await Product.find({
        status: 'active',
        deleted: false
    }).sort({position: "desc"}).limit(6);

    const newLastestProducts = productsHelper.newPriceProducts(lastestProducts)

    //Hết lấy ra sp mới nhất

    res.render('client/pages/home/index', {
        pageTitle: 'Trang chủ',
        productsFeatured: newProducts,
        newLastestProducts: newLastestProducts
    });//Đây là file controller dc navigate đến sau khi đúng route
}