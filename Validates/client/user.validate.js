module.exports.registerPost = (req, res, next) => {  //chỉ cần viết validate như này và nhúng vào route để hàm này thành hàm trung gian
    if(!req.body.fullName) { //Validate
        req.flash("error", `Vui lòng nhập họ tên!`);
        res.redirect("back");
        return; //Để không chạy đoạn code bên dưới mặc dù đã redirect
    }

    if(!req.body.email) { //Validate
        req.flash("error", `Vui lòng nhập email!`);
        res.redirect("back");
        return; //Để không chạy đoạn code bên dưới mặc dù đã redirect
    }

    if(!req.body.password) { //Validate
        req.flash("error", `Vui lòng nhập mật khẩu!`);
        res.redirect("back");
        return; //Để không chạy đoạn code bên dưới mặc dù đã redirect
    }

    next(); //cho chạy sang hàm tiếp theo mà ở đây là hàm    controller
}

module.exports.loginPost = (req, res, next) => {  //chỉ cần viết validate như này và nhúng vào route để hàm này thành hàm trung gian
    if(!req.body.email) { //Validate
        req.flash("error", `Vui lòng nhập email!`);
        res.redirect("back");
        return; //Để không chạy đoạn code bên dưới mặc dù đã redirect
    }

    if(!req.body.password) { //Validate
        req.flash("error", `Vui lòng nhập mật khẩu!`);
        res.redirect("back");
        return; //Để không chạy đoạn code bên dưới mặc dù đã redirect
    }

    next(); //cho chạy sang hàm tiếp theo mà ở đây là hàm    controller
}


module.exports.forgotPassword = (req, res, next) => {  //chỉ cần viết validate như này và nhúng vào route để hàm này thành hàm trung gian
    if(!req.body.email) { //Validate
        req.flash("error", `Vui lòng nhập email!`);
        res.redirect("back");
        return; //Để không chạy đoạn code bên dưới mặc dù đã redirect
    }

    next(); //cho chạy sang hàm tiếp theo mà ở đây là hàm    controller
}

module.exports.otp = (req, res, next) => {  //chỉ cần viết validate như này và nhúng vào route để hàm này thành hàm trung gian
    if(!req.body.otp) { //Validate
        req.flash("error", `Vui lòng nhập otp!`);
        res.redirect("back");
        return; //Để không chạy đoạn code bên dưới mặc dù đã redirect
    }

    next(); //cho chạy sang hàm tiếp theo mà ở đây là hàm    controller
}

module.exports.resetPasswordPost = (req, res, next) => {
    if(!req.body.password) {
        req.flash("error", `Vui lòng nhập mật khẩu!`);
        res.redirect("back");
        return;
    }

    if(!req.body.confirmPassword) {
        req.flash("error", `Vui lòng nhập xác nhận mật khẩu!`);
        res.redirect("back");
        return;
    }

    if(req.body.password !== req.body.confirmPassword) {
        req.flash("error", `Mật khẩu và xác nhận mật khẩu phải trùng nhau!`);
        res.redirect("back");
        return;
    }

    next();
}