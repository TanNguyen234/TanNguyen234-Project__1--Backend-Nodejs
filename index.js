const express = require("express");//import express vì là file index chính của project
const methodOverride = require('method-override');//Nhúng methodOverride để ghi đè
const mongoose = require("mongoose");

require('dotenv').config();

const database = require("./config/database");

const systemConfig = require('./config/system')

database.connect(); 

const routeAdmin = require('./routes/admin/index.route.js')//import routes chính của admin
const route = require("./routes/client/index.route.js");//import file route chính chứa tất cả các route

const app = express();
const port = process.env.PORT;

app.use(methodOverride("_method")); //Sử dụng library method override

app.set("views", "./views");//Thiết lập vào thắng folder views vì view là folder show ra website
app.set("view engine", "pug");//Template engine có thể là PUG, EJS, Handlebars...

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;//Tạo biến toàn cục dùng được ở mọi file pug để linh hoạt path

app.use(express.static("public"));// Nhúng file tĩnh để để hiểu rằng folder public chứa file tĩnh để public ra bên ngoài

//Routes
routeAdmin(app);//Khi định import rồi thì truyền app vào
route(app);//sử dụng route truyền app vào để sử dụng ở file index.route.js

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
