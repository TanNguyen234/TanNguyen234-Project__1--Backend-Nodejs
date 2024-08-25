const ProductCategory = require('../models/product-category.model')

module.exports.getSubCategory = async (parentId) => {
    const getCategory = async (parentId) => {
        const subs = await ProductCategory.find({
            status: 'active',
            deleted: false,
            parent_id: parentId
        });//Coi id của category cừa bấm là cha

        let allSubs = [...subs];//Tìm được mấy thằng con cấp 1 bỏ vào đây

        for (const sub of subs) {
            const childs = await getCategory(sub.id);//Coi mấy thằng con cừa tìm được là cha
            allSubs = allSubs.concat(childs);//Hàm concat dùng để kết hợp 2 hay nhiều mảng
        }

        return allSubs;
    }

    const result = await getCategory(parentId);

    return result;
}