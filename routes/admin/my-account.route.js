const express = require("express"); //import express để dùng hàm express.Router()
const multer = require("multer"); //import multer
const upload = multer();
const router = express.Router();

const controller = require("../../controllers/admin/my-account.controller.js");

const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware.js');

router.get("/", controller.index); //Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.get("/edit", controller.edit); //Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.patch(
  "/edit",
  upload.single("avatar"),
  uploadCloud.upload,
  controller.editPatch
); //Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

module.exports = router; //export hàm router
