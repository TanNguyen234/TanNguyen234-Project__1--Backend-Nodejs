const categoryMiddleWare = require('../../middlewares/client/categories.middleware');
const cartMiddleWare = require('../../middlewares/client/cart.middleware');
const userMiddleWare = require('../../middlewares/client/user.middleware');


const productRoutes = require('./product.route')
const homeRoutes = require('./home.route')
const searchRoutes = require('./search.route')
const cartRoutes = require('./cart.route')
const checkoutRoutes = require('./checkout.route')
const userRoutes = require('./user.route')

module.exports = (app) => {
    app.use(categoryMiddleWare.category) //Mọi route bên client đều có product categories nên viết như này khác với auth bên admin
    app.use(cartMiddleWare.cartId)
    app.use(userMiddleWare.userInfo)

    app.use("/", homeRoutes);//Nếu đúng route thì sẽ dẫn đến controller và để tách nhỏ ra theo mô hình MVC thì phải import vào

    app.use("/products", productRoutes);//vd: homeRoutes và productRoutes

    app.use("/search", searchRoutes);//vd: homeRoutes và productRoutes

    app.use("/cart", cartRoutes);

    app.use("/checkout", checkoutRoutes);

    app.use("/user", userRoutes)
}