const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

const globalMiddelwares = (app, dir) => {
  app.use("/public", express.static(path.join(dir, "public")));  
  app.use(
    cors({
      origin: true,
      methods: ["POST", "PUT", "GET", "DELETE"],
      credentials: true,
    })
  );
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cookieParser());

  app.use("/api/loaisanpham", require("../modules/loaisanpham"));
  app.use("/api/sanpham", require("../modules/sanpham"));
};

module.exports = globalMiddelwares;
