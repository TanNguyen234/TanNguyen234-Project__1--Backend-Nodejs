const express = require('express');//import express để dùng hàm express.Router()
const router = express.Router();

const controller = require('../../controllers/client/users.controller.js');

router.get("/not-friend", controller.notFriend);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.get("/request", controller.request);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.get("/accept", controller.accept);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

module.exports = router;//export hàm router