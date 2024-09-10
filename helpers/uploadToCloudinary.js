const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
//Cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

//End Cloudinary
let streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports.uploadToCloudinary = async (buffer) => {
  let result = await streamUpload(buffer);   
  return result.secure_url;
} //Tạo một trường req.file.fieldname trong req.body có giá trị result.secure_url để trong controller luu vào database