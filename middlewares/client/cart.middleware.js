const Cart = require("../../models/cart.model.js");

module.exports.cartId = async (req, res, next) => {
  
    if(!req.cookies.cartId) {

       const cart = new Cart();
       await cart.save();

       const exprisesCookie = 1000 * 60 * 60 * 24 * 365;
       
       res.cookie('cartId', cart.id, { expires: new Date(Date.now() + exprisesCookie) })
    } else {
       
    }

    next();
}