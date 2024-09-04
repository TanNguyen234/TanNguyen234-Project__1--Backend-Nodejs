const SettingModel = require('../../models/settings-general.model')

// [GET] /admin/setting/general
module.exports.general = async (req, res) => {
    const settingGeneral = await SettingModel.findOne({})

    res.render('admin/pages/settings/general', {
        pageTitle: 'Cài đăt chung',
        settingGeneral: settingGeneral
    })
}

// [PATCH] /admin/setting/general
module.exports.generalPatch = async (req, res) => {
    const settingGeneral = await SettingModel.findOne({})

    if(settingGeneral) {
        await SettingModel.updateOne({
            _id: settingGeneral.id
        }, req.body)
    } else {
        const record = new SettingModel(req.body)
        settingGeneral.save()
    }

    res.redirect('back')
}