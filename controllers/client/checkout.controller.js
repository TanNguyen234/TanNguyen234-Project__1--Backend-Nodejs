const Orders = require("../../models/orders.model");
const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");

const productHelper = require("../../helpers/products");

//[GET] /checkout/
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;

  const cart = await Cart.findOne({ _id: cartId });

  if (cart.products.length > 0) {
    var totalPrice = 0;
    for (const item of cart.products) {
      const productId = item.product_id;

      const productInfor = await Product.findOne({
        _id: productId,
        status: "active",
        deleted: false,
      }).select("title thumbnail slug price discountPercentage");

      console.log(productInfor);

      const newproductInfor = productHelper.newPriceProduct(productInfor);

      item.totalPrice = newproductInfor.priceNew * item.quantity;

      totalPrice += item.totalPrice;

      item.productInfor = newproductInfor;
    }

    cart.totalPrice = totalPrice;
  }

  res.render("client/pages/checkout/index", {
    pageTitle: "Đặt hàng",
    cartDetail: cart,
  });
};

//[GET] /checkout/order
module.exports.order = async (req, res) => {
  const cartId = req.cookies.cartId;
  const userInfo = req.body;
  const cart = await Cart.findOne({ _id: cartId });
  const products = [];

  for (const product of cart.products) {
    const objectProduct = {
      product_id: product.product_id,
      price: 0,
      discountPercentage: 0,
      quantity: product.quantity,
    };

    const productInfor = await Product.findOne({
      _id: product.product_id,
      status: "active",
      deleted: false,
    }).select("price discountPercentage");

    objectProduct.price = productInfor.price;
    objectProduct.discountPercentage = productInfor.discountPercentage;

    products.push(objectProduct);
  }

  const orderInfo = {
    cart_id: cartId,
    userInfor: userInfo,
    products: products
  };

  const order = new Orders(orderInfo);
  order.save();

  await Cart.updateOne({
    _id: cartId,
  },{
    products: []//Hoặc dùng câu lệnh pull ở đây để xóa những sp đã chọn và chừa lại sp không chọn như trang admin tính năng updateMany
  })

  req.flash("success", "Đã đặt hàng thành công");
  res.redirect(`/checkout/success/${order.id}`);
};

//[GET] /checkout/success/:orderId
module.exports.success = async (req, res) => {
  console.log(req.params.orderId)

  res.render('client/pages/checkout/success', {
    pageTitle: 'Đặt hàng thành công',
  })
};
