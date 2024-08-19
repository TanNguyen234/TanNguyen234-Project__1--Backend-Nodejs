const systemConfig = require("../../config/system");

const Accounts = require("../../models/acounts.model");

module.exports.requireAuth = async (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
        const user = await Accounts.findOne({ token : token });
        if(!user) {
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        } else {
            next();
        }
    }
}