module.exports.index =(req, res) => {//Tên hàm controller ở đây là index là file chính của product
    res.render('client/pages/products/index.pug');//Đây là file controller dc navigate đến sau khi đúng route
}