const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
//Cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

//End Cloudinary

module.exports.upload = (req, res, next) => {//Hàm Upload lên cloudinary
    if (req.file) {
      let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          });

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      async function upload(req) {
        let result = await streamUpload(req);   
        req.body[req.file.fieldname] = result.secure_url; //req.file.fieldname để linh động thay cho req.body.thumbnail vì khi upload có thể là thumbnail hoặc image
        next(); //luôn luôn next vì không phải lúc nào cũng upload ảnh có thể upload sau
      } //Tạo một trường req.file.fieldname trong req.body có giá trị result.secure_url để trong controller luu vào database

      upload(req);
    } else {
      next();
    }
  }