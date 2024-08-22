//[GET] /
module.exports.index = async (req, res) => {//Tên hàm controller ở đây là index là file chính của home
    res.render('client/pages/home/index', {
        pageTitle: 'Trang chủ',
    });//Đây là file controller dc navigate đến sau khi đúng route
}