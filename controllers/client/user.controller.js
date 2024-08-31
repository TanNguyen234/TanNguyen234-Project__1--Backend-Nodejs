const md5 = require("md5");
const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");
const generateHelper = require('../../helpers/generate')

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

//[GET] /user/password/forgot
module.exports.forgotPassword = (req, res) => {
  res.render('client/pages/user/forgot-password', {
    titlePage: 'Lấy lại mật khẩu'
  })
}

//[POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email

  const user = await User.findOne({
    email: email,
    deleted: false,
    status: 'active'
  })

  if(!user) {
    req.flash('error', 'Email không tồn tại')
    res.redirect('back')
    return;
  }
  // Lưu thông tin vào DB
  const otp = generateHelper.generateRandomNumber(8)

  const objectForgotPassword = {
    email: email,
    otp: otp,
    expireAt: Date.now()
  }

  const forgotPassword = new ForgotPassword(objectForgotPassword)
  await forgotPassword.save()

  console.log(forgotPassword)

  //Nếu tồn tại email gửi mã OTP qua email

  res.send('ok')
}