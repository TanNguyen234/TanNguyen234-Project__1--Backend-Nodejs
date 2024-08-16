var md5 = require("md5");
const systemConfig = require("../../config/system");

const Accounts = require("../../models/acounts.model");
const Roles = require("../../models/roles.model");

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await Accounts.find(find).select("-password -token");
  //select('id) lấy id
  //.select('-password -token') lấy tất cả các trườnng của document, trừ password và token

  for (const record of records) {
    const role = await Roles.findOne({
      _id: record.role_id,
      deleted: false,
    });

    record.role = role.title;
    console.log(records);
  }

  res.render("admin/pages/account/index", {
    pageTitle: "Trang danh sách tài khoản",
    records: records,
  });
};

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
  const records = await Roles.find({ deleted: false });

  res.render("admin/pages/account/create", {
    pageTitle: "Tạo mới tài khoản",
    records: records,
  });
};
// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  const check_email = await Accounts.findOne({
    email: req.body.email,
    deleted: false,
  });

  if (check_email) {
    req.flash("error", "Email đã tồn tại ");
    res.redirect(`back`);
  } else {
    req.body.password = md5(req.body.password);

    const records = await Accounts(req.body);
    await records.save();

    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};
// [GET] /admin/accounts/edit
module.exports.edit = async (req, res) => {
  let find = {
    _id: req.params.id,
    deleted: false,
  };

  try {
    const record = await Accounts.findOne(find);

    const roles = await Roles.find({ deleted: false });

    res.render("admin/pages/account/edit", {
      pageTitle: "Chỉnh sửa tài khoản",
      record: record,
      roles: roles,
    });
  } catch (err) {
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  const check_email = await Accounts.findOne({//Trả 1 phần tử find trả về mảng nên có chech array.length > 0
    _id: {$ne: id}, //Tìm theo id not equal id currently cú pháp mongoose
    email: req.body.email,
    deleted: false,
  });

  if (check_email) {
    req.flash("error", `Email ${req.body.email} đã tồn tại`);
  } else {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password; //Xóa key password
    }

    await Accounts.updateOne({ _id: id }, req.body);

    req.flash("success", "Tài khoản đã được sửa thành công");
  }
  res.redirect(`back`);
};