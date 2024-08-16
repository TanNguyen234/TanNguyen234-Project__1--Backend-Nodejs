const express = require('express');//import express để dùng hàm express.Router()
const router = express.Router();

const controller = require('../../controllers/admin/auth.controller.js');
const validate = require('../../Validates/admin/auth.validate.js')

router.get("/login", controller.login);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.post("/login",validate.loginPost, controller.loginPost);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.get("/logout", controller.logout);//Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

module.exports = router;//export hàm router