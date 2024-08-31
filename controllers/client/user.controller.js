const md5 = require("md5");
const User = require("../../models/user.model");

//[GET] /user/register
module.exports.register = async (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Đăng ký tài khoản",
  });
};

//[POST] /user/register
module.exports.registerPost = async (req, res) => {
  console.log(req.body);
  const existEmail = await User.findOne({
    email: req.body.email,
  });

  if (existEmail) {
    req.flash("error", "Email đã tồn tại");
    res.redirect("back");
    return;
  }

  req.body.password = md5(req.body.password);

  const user = await User(req.body);
  await user.save();

  res.cookie("tokenUser", user.tokenUser);

  req.flash("success", "Đăng ký thành công");
  res.redirect("/");
};

//[GET] /user/login
module.exports.login = async (req, res) => {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng nhập tài khoản",
      });
};

//[POST] /user/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email
    const password = md5(req.body.password)

    const user = await User.findOne({
        email: email,
        deleted: false
    })

    if(!user) {
        req.flash('error', 'Email không đúng')
        res.redirect('back')
        return;
    }

    if(password !== user.password) {
        req.flash('error', 'Mật khẩu không đúng')
        res.redirect('back')
        return;
    }

    if(user.status === 'inactive') {
        req.flash('error', 'Tài khoản đang bị khóa')
        res.redirect('back')
        return;
    }

    res.cookie('tokenUser', user.tokenUser)
    req.flash('success', 'Đã đăng nhập thành công')
    res.redirect('/')
};
//[GET] /user/logout
module.exports.logout = (req, res) => {
  res.clearCookie('tokenUser');
  req.flash('success', 'Đã đăng xuất thành công');
  res.redirect('/');
}
