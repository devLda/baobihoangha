const express = require("express");
const control = require("./sanpham.controller");
const router = express.Router();

router.post("/add", control.create);

router.get("/", control.getAll);

// router.get("/multi/:pid", control.getMultiDataSanPham);

// router.get("/multisanpham", control.getMultiAllData);

// router.get("/get/:id", control.getById);

router.get("/get/:maSanPham", control.getSanPham);

router.put("/update/:id", control.update);

router.delete("/delete/:id", control.remove);

// router.post("/uploadimage", control.uploadSingleImage);

module.exports = router;
