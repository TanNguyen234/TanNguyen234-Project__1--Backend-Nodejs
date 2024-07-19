const dashboardRoutes = require('./dashboard.route');
const systemConfig = require('../../config/system.js');

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + `/dashboard`, dashboardRoutes);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller admin
}