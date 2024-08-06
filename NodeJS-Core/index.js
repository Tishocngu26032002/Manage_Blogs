require("dotenv").config({
  path: "./.env",
});
require("rootpath")();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const router = require("routes/api");
const { swaggerUIServe, swaggerUISetup } = require("kernels/api-docs");
const cors = require('cors');
const app = express();
const path = require('path');

app.disable("x-powered-by");

app.use(cors({
  origin: 'http://localhost:4200', // Địa chỉ của ứng dụng Angular
  credentials: true // Cho phép gửi cookies và các thông tin xác thực khác
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use("/", router);
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());

app.use("/api-docs", swaggerUIServe, swaggerUISetup);

module.exports = app
