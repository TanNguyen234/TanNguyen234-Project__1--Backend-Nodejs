const Accounts = require("../../models/accounts.model");
const Users = require('../../models/user.model')
const ProductCategory = require("../../models/product-category.model.js");
const Product = require('../../models/product.model');

// [GET] /admin/dashboard
module.exports.dashboard = async (req, res) => {
    const statistic = {
        categoryProduct: {
            total: 0,
            active: 0,
            inactive: 0
        },
        product: {
            total: 0,
            active: 0,
            inactive: 0
        },
        account: {
            total: 0,
            active: 0,
            inactive: 0
        },
        user: {
            total: 0,
            active: 0,
            inactive: 0
        }
    }

    statistic.categoryProduct.total = await ProductCategory.countDocuments({
        deleted: false
    })

    statistic.product.total = await Product.countDocuments({
        deleted: false
    })

    statistic.account.total = await Accounts.countDocuments({
        deleted: false
    })

    statistic.user.total = await Users.countDocuments({
        deleted: false
    })

    statistic.categoryProduct.active = await ProductCategory.countDocuments({
        deleted: false,
        status: 'active'
    })

    statistic.product.active = await Product.countDocuments({
        deleted: false,
        status: 'active'
    })

    statistic.account.active = await Accounts.countDocuments({
        deleted: false,
        status: 'active'
    })

    statistic.user.active = await Users.countDocuments({
        deleted: false,
        status: 'active'
    })

    statistic.categoryProduct.inactive = await ProductCategory.countDocuments({
        deleted: false,
        status: 'inactive'
    })

    statistic.product.inactive = await Product.countDocuments({
        deleted: false,
        status: 'inactive'
    })

    statistic.account.inactive = await Accounts.countDocuments({
        deleted: false,
        status: 'inactive'
    })

    statistic.user.inactive = await Users.countDocuments({
        deleted: false,
        status: 'inactive'
    })

    res.render('admin/pages/dashboard/index', {
        pageTitle: 'Trang tổng quan',
        statistic: statistic
    })
}