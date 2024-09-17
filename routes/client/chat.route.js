const express = require('express');//import express để dùng hàm express.Router()
const router = express.Router();

const controller = require('../../controllers/client/chat.controller.js');

const chatMiddleware = require('../../middlewares/client/chat.middleware.js');

router.get("/:roomChatId", chatMiddleware.isAccess, controller.index);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

module.exports = router;//export hàm router