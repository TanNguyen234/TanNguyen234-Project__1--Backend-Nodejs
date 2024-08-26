const Product = require('../../models/product.model');
const productsHelper = require('../../helpers/products');

//[GET] /search
module.exports.index = async (req, res) => {
  const keyword = req.query.keyword;

  let newProducts = [];

  if(keyword) {
    const regex = new RegExp(keyword, 'i');//Thêm i để tìm inline
    const products = await Product.find({
        deleted: false,
        status: 'active',
        title: regex
    })
    
    newProducts = productsHelper.newPriceProducts(products);
  }

  res.render(`client/pages/search/index`, {
    pageTitle: 'Kết quả tìm kiếm',
    keyword: keyword,
    products: newProducts
  })
}