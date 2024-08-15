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

// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await Roles.find(find);

    res.render("admin/pages/roles/permissions", {
        pageTitle: 'Phân quyền',
        records: records
    })
}
// [POST] /admin/roles/permissions
module.exports.permissionsPost = async (req, res) => {
    const data = JSON.parse(req.body.permissions);
    
    for (const item of data) {
        await Roles.updateOne({_id : item.id}, {permissions: item.permissions});
    }
    
    req.flash("success", "Phân quyền đã được cập nhật!");

    res.redirect("back")
}