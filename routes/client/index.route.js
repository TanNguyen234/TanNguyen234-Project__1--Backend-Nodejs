const productRoutes = require('./product.route')
const homeRoutes = require('./home.route')

module.exports = (app) => {
    app.use("/", homeRoutes);//Nếu đúng route thì sẽ dẫn đến controller và để tách nhỏ ra theo mô hình MVC thì phải import vào
    app.use("/products", productRoutes);//vd: homeRoutes và productRoutes
}