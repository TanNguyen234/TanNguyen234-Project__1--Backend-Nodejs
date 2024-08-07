const express = require("express"); //import express để dùng hàm express.Router()
const router = express.Router();
const multer = require("multer"); //import multer
const upload = multer();

const controller = require("../../controllers/admin/product-category.controller.js");

const validate = require("../../Validates/admin/product-category.validate.js");

const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware.js');

router.get("/", controller.index); //Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.get('/create', controller.create)

router.post(
    "/create",
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost
  );

module.exports = router; //export hàm router
