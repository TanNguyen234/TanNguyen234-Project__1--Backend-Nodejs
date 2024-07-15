module.exports.index =(req, res) => {//Tên hàm controller ở đây là index là file chính của product
    res.render('client/pages/products/index.pug', {
        pageTitle: "Trang danh sách sản phẩm" //Trả về view cho title=pageTitle ở file layouts/default.pug
    });//Đây là file controller dc navigate đến sau khi đúng route
}