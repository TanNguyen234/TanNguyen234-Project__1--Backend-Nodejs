const express = require("express"); //import express để dùng hàm express.Router()
const router = express.Router();

const controller = require("../../controllers/client/user.controller.js");
const validate = require("../../Validates/client/user.validate.js");

router.get("/register", controller.register); //Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.post("/register", validate.registerPost, controller.registerPost); //Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

module.exports = router; //export hàm router
