const express = require('express');//import express để dùng hàm express.Router()
const router = express.Router();

const controller = require('../../controllers/client/product.controller');

router.get("/", controller.index);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.get("/:slugCategory", controller.category);

router.get("/detail/:slugProduct", controller.detail);

module.exports = router;//export hàm router