const md5 = require("md5");
const Account = require("../../models/accounts.model");
const systemConfig = require("../../config/system");

// [GET] /admin/my-account
module.exports.index = (req, res) => {
  res.render("admin/pages/my-account/index", {
    pageTitle: "Trang thông tin cá nhân",
  });
};

// [GET] /admin/my-account/edit
module.exports.edit = async (req, res) => {
  res.render("admin/pages/my-account/edit", {
    pageTitle: "Trang chỉnh sửa thông tin cá nhân",
  });
};

// [PATCH] /admin/my-account/edit
module.exports.editPatch = async (req, res) => {
  const id = res.locals.user.id;

  const check_email = await Account.findOne({
    //Trả 1 phần tử find trả về mảng nên có chech array.length > 0
    _id: { $ne: id }, //Tìm theo id not equal id currently cú pháp mongoose
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

    await Account.updateOne({ _id: id }, req.body);

    req.flash("success", "Tài khoản đã được sửa thành công");
  }
  res.redirect(`back`);
};
