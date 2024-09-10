const uploadToCloudinaryHelper = require('../../helpers/uploadToCloudinary')

module.exports.upload = async (req, res, next) => {//Hàm Upload lên cloudinary
    if (req.file) {
      const link = await uploadToCloudinaryHelper.uploadToCloudinary(req.file.req);
      req.body[req.file.fieldname] = link; //req.file.fieldname để linh động thay cho req.body.thumbnail vì khi upload có thể là thumbnail hoặc image
    }
    
    next();
}