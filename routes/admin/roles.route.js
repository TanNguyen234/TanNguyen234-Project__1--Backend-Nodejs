const express = require('express');//import express để dùng hàm express.Router()
const router = express.Router();

const controller = require('../../controllers/admin/roles.controller.js');

router.get("/", controller.index);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.get("/create", controller.create);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.post("/create", controller.createPost);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

module.exports = router;//export hàm router