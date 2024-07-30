const express = require('express');//import express để dùng hàm express.Router()
const router = express.Router();

const controller = require('../../controllers/admin/product.controller.js');

router.get("/", controller.index);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.patch("/change-status/:status/:id", controller.changeStatus);//:status để truyền data động và dùng PATCH

router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create);//Get để lấy trang tạo sp

router.post("/create", controller.createPost);//Có thể trùng route nhưng phải khác phương thức

module.exports = router;//export hàm router