const ProductCategory = require("../../models/product-category.model.js");

const createTreeHelper = require("../../helpers/createTree.js");

module.exports.category = async (req, res, next) => {
    let find = {
        deleted: false,
        status: 'active'
    };

    const records = await ProductCategory.find(find);

    const newRecords = createTreeHelper.tree(records);
    
    res.locals.productCategories = newRecords;
    next();
}