const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");

const productHelper = require("../../helpers/products");

//[GET] /cart
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

  res.render("client/pages/cart/index", {
    titlePage: "Giỏ hàng",
    cartDetail: cart,
  });
};

//[POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
  //Tên hàm controller ở đây là index là file chính của home
  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity);
  const cartId = req.cookies.cartId;

  const cart = await Cart.findOne({
    _id: cartId,
  });

  const existProductCart = cart.products.find(
    (item) => item.product_id === productId
  );

  if (existProductCart) {
    const newQuantity = quantity + existProductCart.quantity;

    await Cart.updateOne(
      {
        //Cách update array của một object
        _id: cartId,
        "products.product_id": productId,
      },
      {
        $set: {
          "products.$.quantity": newQuantity,
        },
      }
    );
  } else {
    const objectCart = {
      product_id: productId,
      quantity: quantity,
    };

    await Cart.updateOne(
      {
        _id: cartId,
      },
      {
        $push: {
          products: objectCart,
        },
      }
    );
  }

  req.flash("success", "Đã thêm sản phẩm vào giỏ hàng thành công");

  res.redirect("back");
};

//[GET] /cart/delete/:productId
module.exports.delete = async (req, res) => {
  const cartId = req.cookies.cartId;
  const productId = req.params.productId;
  try {
    await Cart.updateOne(
      {
        _id: cartId,
      },
      {
        $pull: {
          products: { product_id: productId }, //Xóa một object trong array
        },
      }
    );
    req.flash("success", "Đã xóa sản phẩm khỏi giỏ hàng thành công");
  } catch (err) {
    req.flash("error", "Xóa sản phẩm thất bại");
  }
  res.redirect("back");
};

//[GET] /cart/update/:productId/:quantity

module.exports.update = async (req, res) => {
  const cartId = req.cookies.cartId;
  const productId = req.params.productId;
  const quantity = req.params.quantity;

  await Cart.updateOne(
    {
      //Cách update một trường trong object của một array
      _id: cartId,
      "products.product_id": productId,
    },
    {
      $set: {
        "products.$.quantity": quantity,
      },
    }
  );

  res.redirect("back");
};
