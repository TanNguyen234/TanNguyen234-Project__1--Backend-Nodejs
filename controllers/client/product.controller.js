const Product = require('../../models/product.model');
const ProductCategory = require('../../models/product-category.model');
const productsHelper = require('../../helpers/products');
const productCategoryHelper = require('../../helpers/products-category')

//[GET] /products
module.exports.index = async (req, res) => {//Tên hàm controller ở đây là index là file chính của product

    const products = await Product.find({   //Lọc product
        status: 'active',
        deleted: false
    }).sort({ position: "desc" });

    const newProducts = productsHelper.newPriceProducts(products)

    res.render('client/pages/products/index.pug', {
        pageTitle: "Trang danh sách sản phẩm", //Trả về view cho title=pageTitle ở file layouts/default.pug
        products: newProducts, //Trả về mảng sản phẩm ở file views/client/pages/products/index.pug
    });//Đây là file controller dc navigate đến sau khi đúng route
}

//[GET] /products/detail/:slugProduct
module.exports.detail = async (req, res) => {
    try {
        const product = await Product.findOne({  //Lọc product
            status: 'active',
            deleted: false,
            slug: req.params.slugProduct
        });

        if(product.product_category_id) {
            const category = await ProductCategory.findOne({
                status: 'active',
                deleted: false,
                _id: product.product_category_id
            })

            product.category = category
        }
        
        const newProduct = productsHelper.newPriceProduct(product);

        res.render('client/pages/products/detail', {
            pageTitle: product.title,
            product: newProduct
        })

    } catch {
        res.redirect('back')
    }
}

//[GET] /products/:slugCategory
module.exports.category = async (req, res) => {

    try {
        const category = await ProductCategory.findOne({  //Lọc product-category
            status: 'active',
            deleted: false,
            slug: req.params.slugCategory
        });

        const listSubCategory = await productCategoryHelper.getSubCategory(category.id);
        
        let all = listSubCategory.map(item => item.id)
        all.push(category.id);
        
        const products = await Product.find({
            status: 'active',
            deleted: false,
            product_category_id: { $in : all}
        }).sort({ position: 'desc'})

        const newProducts = productsHelper.newPriceProducts(products)

        res.render('client/pages/products/index.pug', {
            pageTitle: category.title,
            products: newProducts
        });

    } catch (e) {
        res.redirect('back')
    }
}