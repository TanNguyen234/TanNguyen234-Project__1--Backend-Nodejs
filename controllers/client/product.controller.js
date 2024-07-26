const Product = require('../../models/product.model');

//[GET] /products
module.exports.index = async (req, res) => {//Tên hàm controller ở đây là index là file chính của product

    const products = await Product.find({   //Lọc product
        status: 'active',
        deleted: false
    }).sort({position: "desc"});

    const newProducts = products.map(item => {
        item.priceNew = item.price - (item.price*item.discountPercentage/100).toFixed(1);
        return item;
    })

    console.log(products); //In ra mảng sản phẩm để kiểm tra

    res.render('client/pages/products/index.pug', {
        pageTitle: "Trang danh sách sản phẩm", //Trả về view cho title=pageTitle ở file layouts/default.pug
        products: newProducts //Trả về mảng sản phẩm ở file views/client/pages/products/index.pug
    });//Đây là file controller dc navigate đến sau khi đúng route
}