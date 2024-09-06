const express = require("express"); //import express vì là file index chính của project
const path = require("path"); //Thư viện có sẵn trong express js khai báo dùng cho tinymce
const methodOverride = require("method-override"); //Nhúng methodOverride để ghi đè
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser"); // thư viện này để parser khi server phản hồi về view
const session = require("express-session");
const moment = require("moment");
const http = require('http');
const { Server } = require("socket.io");

require("dotenv").config();

const database = require("./config/database");

const systemConfig = require("./config/system");

database.connect();

const routeAdmin = require("./routes/admin/index.route.js"); //import routes chính của admin
const route = require("./routes/client/index.route.js"); //import file route chính chứa tất cả các route

const app = express();
const port = process.env.PORT || 3000;

//SocketIO
const server = http.createServer(app);
const io = new Server(server);
global._io = io; //Tạo biến global cả app
//End Socket

//TinyMCE trình soạn thảo văn bản có file /tinymce/tinymce.min.js
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride("_method")); //Sử dụng library method override

app.set("views", `${__dirname}/views`); //Thiết lập vào thắng folder views vì view là folder show ra website
app.set("view engine", "pug"); //Template engine có thể là PUG, EJS, Handlebars...

//Flash thư viện cho thông báo cho express js
app.use(cookieParser("YSUDGSGDJSGDJ")); //key ngâu nhiên cho tăng tính bảo mật
app.use(session({ cookie: { maxAge: 60000 } })); //Thời gian cookie tồn tại 60000 ml giây
app.use(flash());

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin; //Tạo biến toàn cục dùng được ở mọi file [pug] để linh hoạt path
app.locals.moment = moment;

//_dirname là cấu trúc thư mục của project dùng được local và online
app.use(express.static(`${__dirname}/public`)); // Nhúng file tĩnh để để hiểu rằng folder public chứa file tĩnh để public ra bên ngoài

//Routes
routeAdmin(app); //Khi định import rồi thì truyền app vào
route(app); //sử dụng route truyền app vào để sử dụng ở file index.route.js
app.get('*', (req, res) => {
  res.render('client/pages/errors/404', {
    titlePage: '404 Not Found',
  })
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});