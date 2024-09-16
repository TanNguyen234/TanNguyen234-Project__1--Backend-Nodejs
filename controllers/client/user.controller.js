const md5 = require("md5");
const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");
const Cart = require("../../models/cart.model");

const generateHelper = require("../../helpers/generate");
const sendMailHelper = require('../../helpers/sendMail')

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
  const email = req.body.email;
  const password = md5(req.body.password);

  const user = await User.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    req.flash("error", "Email không đúng");
    res.redirect("back");
    return;
  }

  if (password !== user.password) {
    req.flash("error", "Mật khẩu không đúng");
    res.redirect("back");
    return;
  }

  if (user.status === "inactive") {
    req.flash("error", "Tài khoản đang bị khóa");
    res.redirect("back");
    return;
  }

  const cartExist = await Cart.findOne({
    user_id: user.id
  })

  if(cartExist) {
    await Cart.deleteOne({
      _id: req.cookies.cartId
    })

    res.cookie('cartId', cartExist.id)
  } else {
    await Cart.updateOne({
      _id: req.cookies.cartId, //ở object-1 Tìm _id đê update
    }, {
      user_id: user.id //ở object-2 update trường
    })
  }

  res.cookie("tokenUser", user.tokenUser);

  await User.updateOne({
    tokenUser: user.tokenUser
  },{
    statusOnline: 'online'
  })

  _io.once('connection', (socket) => {
    socket.broadcast.emit('SERVER_RETURN_USER_STATUS_ONLINE', {
       userId: user.id,
       status: 'online'
    });
  })

  req.flash("success", "Đã đăng nhập thành công");
  res.redirect("/");
};

//[GET] /user/logout
module.exports.logout = async (req, res) => {
  await User.updateOne({
    tokenUser: req.cookies.tokenUser
  },{
    statusOnline: 'offline'
  })
  
  _io.once('connection', (socket) => {
    socket.broadcast.emit('SERVER_RETURN_USER_STATUS_ONLINE', {
       userId: res.locals.user.id,
       status: 'offline'
    });
  })

  res.clearCookie("tokenUser");
  res.clearCookie("cartId");
  req.flash("success", "Đã đăng xuất thành công");
  res.redirect("/");
};

//[GET] /user/password/forgot
module.exports.forgotPassword = (req, res) => {
  res.render("client/pages/user/forgot-password", {
    titlePage: "Lấy lại mật khẩu",
  });
};

//[POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({
    email: email,
    deleted: false,
    status: "active",
  });

  if (!user) {
    req.flash("error", "Email không tồn tại");
    res.redirect("back");
    return;
  }
  // Lưu thông tin vào DB
  const otp = generateHelper.generateRandomNumber(8);

  const objectForgotPassword = {
    email: email,
    otp: otp
  };

  const forgotPassword = new ForgotPassword(objectForgotPassword);
  await forgotPassword.save();

  //Nếu tồn tại email gửi mã OTP qua email
  const subject = "Mã xác minh lấy lại mật khẩu"
  const html = `
    <h1>Mã xác minh đổi mật khẩu</h1>
    <duv>Mã xác minh của bạn là: <b style='color: green'>${otp}<b></div>
    <p>Thời hạn sử dụng là 3 phút.</p>`//Muốn css phải style inline
  sendMailHelper.sendMail(email, subject, html)

  res.redirect(`/user/password/otp?email=${email}`);
};

//[GET] /user/password/otp
module.exports.otpPassword = (req, res) => {
  const email = req.query.email;

  res.render("client/pages/user/otp-password", {
    titlePage: "Nhập mã OTP",
    email: email,
  });
};

//[POST] /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
  const email = req.body.email;
  const result = await ForgotPassword.findOne({
    email: email,
    otp: req.body.otp,
  });

  if (result) {
    const user = await User.findOne({
      email: email,
    });

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/user/password/reset");
  } else {
    req.flash("error", "Mã OTP không đúng");
    res.redirect("back");
  }
};
//[GET] /user/password/reset
module.exports.resetPassword = async (req, res) => {
  res.render("client/pages/user/reset-password", {
    titlePage: "Đặt lại mật khẩu",
  });
};

//[POST] /user/password/reset
module.exports.resetPasswordPost = async (req, res) => {
  const password = md5(req.body.password);
  const tokenUser = req.cookies.tokenUser;

  await User.updateOne(
    {
      tokenUser: tokenUser,
    },
    {
      password: password,
    }
  );

  req.flash("success", "Đã đổi mật khẩu thành công");

  res.redirect("/");
};

//[POST] /user/info
module.exports.info = async (req, res) => {
  res.render('client/pages/user/info', {
    titlePage: 'Thông tin cá nhân'
  })
};