const md5 = require("md5");
const Account = require("../../models/acounts.model");
const systemConfig = require("../../config/system");

// [GET] /admin/auth/login
module.exports.login = (req, res) => {
  res.render("admin/pages/auth/login.pug", {
    titlePage: "Trang đăng nhập",
  });
};
// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let find = {
    email: email,
    password: md5(password),
    deleted: false,
  };

  const user = await Account.findOne(find);

  if (user.status === "inactive") {
    req.flash("error", "Tài khoản đã bị khóa");
    res.redirect("back");
  } else if (user) {
    req.flash("success", "Đã đăng nhập thành công");
    res.cookie("token", user.token); //Trả token về frontend luu vào máy
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
  } else {
    req.flash("error", "Email hoặc mật khẩu không đúng");
    res.redirect("back");
  }
};