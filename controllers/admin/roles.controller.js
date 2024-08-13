const Roles = require('../../models/roles.model');

const systemConfig = require('../../config/system');

// [GET] /admin/roles
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }

    const roles = await Roles.find(find);

    res.render('admin/pages/roles/index', {
        pageTitle: 'Nhóm quyền',
        roles: roles
    })
}
// [GET] /admin/roles/create
module.exports.create = async (req, res) => {

    res.render('admin/pages/roles/create', {
        pageTitle: 'Tạo nhóm quyền',
    })
}
// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {

    const newRecord = await Roles(req.body)
    await newRecord.save();

    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}