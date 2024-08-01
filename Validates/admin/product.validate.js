module.exports.createPost = (req, res, next) => {  //chỉ cần viết validate như này và nhúng vào route để hàm này thành hàm trung gian
    if(!req.body.title) { //Validate
        req.flash("error", `Vui lòng nhập tiêu đề!`);
        res.redirect("back");
        return; //Để không chạy đoạn code bên dưới mặc dù đã redirect
    }

    if(req.body.title.length < 8) { //Validate
        req.flash("error", `Vui lòng tiêu đề có ít nhất 8 ký tự!`);
        res.redirect("back");
        return; //Để không chạy đoạn code bên dưới mặc dù đã redirect
    }

    next(); //cho chạy sang hàm tiếp theo mà ở đây là hàm    controller
}
