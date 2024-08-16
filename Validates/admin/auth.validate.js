module.exports.loginPost = (req, res, next) => {  //chỉ cần viết validate như này và nhúng vào route để hàm này thành hàm trung gian
    if(!req.body.email) { //Validate
        req.flash("error", `Vui lòng email tiêu đề!`);
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
