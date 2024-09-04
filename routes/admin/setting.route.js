const express = require("express"); //import express để dùng hàm express.Router()
const router = express.Router();
const multer = require("multer"); //import multer
const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware.js");

const controller = require("../../controllers/admin/setting.controller.js");

router.get("/general", controller.general); //Nếu đúng route là "/" thì sẽ dẫn đến hàm controller mà ở đây tên hàm là index ở file controller

router.patch(
  "/general",
  upload.single("logo"),
  uploadCloud.upload,
  controller.generalPatch
);

module.exports = router; //export hàm router
