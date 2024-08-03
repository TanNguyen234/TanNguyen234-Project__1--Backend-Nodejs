const express = require('express');//import express để dùng hàm express.Router()
const multer = require('multer');//import multer
const storeMulter = require('../../helpers/storeMulter');
const router = express.Router();
const upload = multer({ storage : storeMulter()});//đường dẫn lưu ảnh upload tính từ folder ngoài cùng đi vào
//StoreMulter la ham custon file name

const controller = require('../../controllers/admin/product.controller.js');
const validate = require('../../Validates/admin/product.validate.js');//Gọi hàm validate

router.get("/", controller.index);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.patch("/change-status/:status/:id", controller.changeStatus);//:status để truyền data động và dùng PATCH

router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create);//Get để lấy trang tạo sp

router.post("/create", upload.single('thumbnail'), validate.createPost, controller.createPost);//Có thể trùng route nhưng phải khác phương thức

router.get("/edit/:id", controller.edit);//Get để lấy trang sửa sp

router.patch("/edit/:id", upload.single('thumbnail'), validate.createPost, controller.editPatch);//Có thể trùng route nhưng phải khác phương thức

router.get("/detail/:id", controller.detail);//Get để lấy trang chi tiết sp

module.exports = router;//export hàm router