const express = require("express"); //import express để dùng hàm express.Router()
const router = express.Router();

const controller = require("../../controllers/client/user.controller.js");
const validate = require("../../Validates/client/user.validate.js");
const authMiddleware = require('../../middlewares/client/auth.middleware')

router.get("/register", controller.register); //Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.post("/register", validate.registerPost, controller.registerPost); //Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.get("/login", controller.login); //Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.post("/login", validate.loginPost, controller.loginPost); //Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.get("/logout", controller.logout); //Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.get("/password/forgot", controller.forgotPassword); //Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.post("/password/forgot", validate.forgotPassword, controller.forgotPasswordPost); //Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.get("/password/otp", controller.otpPassword); //Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.post("/password/otp", validate.otp, controller.otpPasswordPost); //Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.get("/password/reset", controller.resetPassword); //Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.post("/password/reset", validate.resetPasswordPost, controller.resetPasswordPost); //Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.get("/info", authMiddleware.requireAuth, controller.info); //Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

module.exports = router; //export hàm router
