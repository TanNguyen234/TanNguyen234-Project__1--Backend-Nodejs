const express = require('express');//import express để dùng hàm express.Router()
const router = express.Router();

const controller = require('../../controllers/admin/product.controller.js');

router.get("/", controller.index);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.patch("/change-status/:status/:id", controller.changeStatus);//:status để truyền data động và dùng PATCH

router.patch("/change-multi", controller.changeMulti);

module.exports = router;//export hàm router