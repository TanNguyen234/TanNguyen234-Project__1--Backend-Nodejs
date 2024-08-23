module.exports.newPriceProducts = (products) => {
    products.map(item => {
        item.priceNew = item.price - (item.price * item.discountPercentage / 100).toFixed(1);
        return item;
    })
    
    return products;
}