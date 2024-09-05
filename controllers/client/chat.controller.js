//[GET] /chat/
module.exports.index = (req, res) => {
    res.render('client/pages/chat/index.pug', {
        titlePage: 'Chat'
    })
}