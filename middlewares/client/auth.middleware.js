const Users = require("../../models/user.model");

module.exports.requireAuth = async (req, res, next) => {
    const tokenUser = req.cookies.tokenUser;

    if(!tokenUser) {
        res.redirect(`/user/login`);
    } else {

        const user = await Users.findOne({ tokenUser : tokenUser }).select('-password');

        if(!user) {
            res.redirect(`/user/login`);
        } else {
            res.locals.user = user; //Trả về user thành biến toàn cục ở mọi trang pug
            next();
        }
    }
}