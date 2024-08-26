const categoryMiddleWare = require('../../middlewares/client/categories.middleware');

const productRoutes = require('./product.route')
const homeRoutes = require('./home.route')
const searchRoutes = require('./search.route')

module.exports = (app) => {
    app.use(categoryMiddleWare.category) //Mọi route bên client đều có product categories nên viết như này khác với auth bên admin

    app.use("/", homeRoutes);//Nếu đúng route thì sẽ dẫn đến controller và để tách nhỏ ra theo mô hình MVC thì phải import vào

    app.use("/products", productRoutes);//vd: homeRoutes và productRoutes

    app.use("/search", searchRoutes);//vd: homeRoutes và productRoutes
}