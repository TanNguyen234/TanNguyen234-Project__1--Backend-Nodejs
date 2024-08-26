const Cart = require('../../models/cart.model');

//[POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {//Tên hàm controller ở đây là index là file chính của home
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);
    const cartId = req.cookies.cartId;

    const cart = await Cart.findOne({
        _id: cartId
    })

    const existProductCart = cart.products.find(item => item.product_id === productId);

    if(existProductCart) {
        const newQuantity = quantity + existProductCart.quantity;

        await Cart.updateOne({ //Cách update array của một object
            _id: cartId,
            "products.product_id": productId
        }, {
            $set: {
                "products.$.quantity": newQuantity
            }
        })
    } else {
        const objectCart = {
            product_id: productId,
            quantity: quantity,
        }
    
        await Cart.updateOne({
            _id: cartId,
        },{
            $push: {
                products: objectCart
            }
        })
    }

    req.flash('success', 'Đã thêm sản phẩm vào giỏ hàng thành công')

    res.redirect('back');
}