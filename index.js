const express = require("express");//import express vì là file index chính của project
require('dotenv').config();

const route = require("./routes/client/index.route.js");//import file route chính chứa tất cả các route

const app = express();
const port = process.env.PORT;

app.set("views", "./views");//Thiết lập vào thắng folder views vì view là folder show ra website
app.set("view engine", "pug");//Template engine có thể là PUG, EJS, Handlebars...

app.use(express.static("public"));// Nhúng file tĩnh để để hiểu rằng folder public chứa file tĩnh để public ra bên ngoài

//Routes
route(app);//sử dụng route truyền app vào để sử dụng ở file index.route.js

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
