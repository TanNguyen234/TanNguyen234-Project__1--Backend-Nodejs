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
// [GET] /admin/roles/edit
module.exports.edit = async (req, res) => {
    try {
        let find = {
            _id : req.params.id,
            deleted : false
        }

        const role = await Roles.findOne(find)
    
        res.render('admin/pages/roles/edit', {
            pageTitle: 'Sửa nhóm quyền',
            role: role
        }) 
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }
}

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        console.log(req.body, req.params.id)
        const role = await Roles.updateOne({_id : req.params.id}, req.body);
        req.flash("success" , "Sản phẩm đã được cập nhật!");
    } catch (error) {
        req.flash("error" , "Sản phẩm cập nhật thất bại!");
    }

    res.redirect(`back`)
}