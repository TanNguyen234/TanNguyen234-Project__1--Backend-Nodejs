const systemConfig = require("../../config/system");

const Accounts = require("../../models/acounts.model");

const Roles = require("../../models/roles.model");

module.exports.requireAuth = async (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {

        const user = await Accounts.findOne({ token : token }).select('-password');

        if(!user) {
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        } else {
            const role = await Roles.findOne({ _id : user.role_id}).select('title permissions');
            res.locals.user = await user; //Trả về user thành biến toàn cục ở mọi trang pug
            res.locals.role = await role; 
            next();
        }
    }
}