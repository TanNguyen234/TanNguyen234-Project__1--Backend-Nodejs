const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");
const productCategoryRoutes = require("./product-category.route.js");
const rolesRoutes = require("./roles.route.js");
const accountsRoutes = require("./accounts.route.js");
const authRoutes = require("./auth.route.js");

const middleware = require("../../middlewares/admin/auth.middleware.js");

const systemConfig = require("../../config/system.js");

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;

    app.use(PATH_ADMIN + `/dashboard`, middleware.requireAuth, dashboardRoutes); //Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller admin

    app.use(PATH_ADMIN + `/products`, middleware.requireAuth, productRoutes);

    app.use(PATH_ADMIN + `/product-category`, middleware.requireAuth, productCategoryRoutes);

    app.use(PATH_ADMIN + `/roles`, middleware.requireAuth, rolesRoutes);

    app.use(PATH_ADMIN + `/accounts`, middleware.requireAuth, accountsRoutes);

    app.use(PATH_ADMIN + `/auth`, authRoutes);
};