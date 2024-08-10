const ProductCategory = require("../../models/product-category.model.js");

const systemConfig = require("../../config/system");

const createTreeHelper = require('../../helpers/createTree.js');

// [GET] /amin/product-category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await ProductCategory.find(find);

  const newRecords = createTreeHelper.tree(records);

  res.render("admin/pages/product-category/index", {  
    pageTitle: "Danh mục sản phẩm",
    records: newRecords,
  });
};

// [GET] /amin/product-category/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await ProductCategory.find(find);

  const newRecords = createTreeHelper.tree(records);

  console.log(newRecords);

  newRecords.forEach(element => {
    console.log(element.children);
  });

  res.render("admin/pages/product-category/create", {
    pageTitle: "Tạo danh mục sản phẩm",
    records: newRecords,
  });
};

// [POST] /amin/product-category/create
module.exports.createPost = async (req, res) => {
  if (req.body.position == "") {
    const count = await ProductCategory.countDocuments();
    req.body.position = count + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  const record = new ProductCategory(req.body);
  await record.save();

  res.redirect(`${systemConfig.prefixAdmin}/product-category`);
};