const express = require("express"); //import express để dùng hàm express.Router()
const router = express.Router();
const multer = require("multer"); //import multer
const upload = multer();

const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware.js');
const controller = require("../../controllers/admin/accounts.controller.js");
const validate = require("../../Validates/admin/accounts.validate.js");

router.get("/", controller.index); //Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.get("/create", controller.create); //Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.post(
  "/create",
  upload.single("avatar"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
); //Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

module.exports = router; //export hàm router
