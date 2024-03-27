const sanPham = require("./sanpham.model");
const loaiSanPham = require("../loaisanpham/loaisanpham.model");
const asyncHandler = require("express-async-handler");

const create = asyncHandler(async (req, res) => {
  const { maSanPham, maLoaiSanPham, tenSanPham, hinhAnh } = req.body;

  if (!maSanPham || !maLoaiSanPham || !tenSanPham)
    return res.status(400).json({
      success: false,
      mes: "Thiếu trường dữ liệu",
    });

  const loaiSP = await loaiSanPham.findOne({ maLoaiSanPham: maLoaiSanPham });

  if (!loaiSP) throw new Error("Loại sản phẩm không tồn tại");

  const newSanPham = await sanPham.create(req.body);
  return res.status(200).json({
    success: newSanPham ? true : false,
    mes: newSanPham ? newSanPham : "Đã xảy ra lỗi!!!",
  });
});

const getAll = asyncHandler(async (req, res) => {
  let query = req.query || {};
  const result = await sanPham.find(query);

  return res.status(200).json({
    success: result ? true : false,
    data: result ? result : "Đã xảy ra lỗi",
  });
});

const getSanPham = asyncHandler(async (req, res) => {
  const { maSanPham } = req.params;
  if (!maSanPham) throw new Error("Không tìm thấy sản phẩm!!!");
  const result = await Phong.findOne({ maSanPham: maSanPham });

  return res.status(200).json({
    success: result ? true : false,
    mes: result ? result : "Đã xảy ra lỗi",
  });
});

const getById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new Error("Không tìm thấy sản phẩm!!!");
  const result = await Phong.findById(id);

  return res.status(200).json({
    success: result ? true : false,
    mes: result ? result : "Đã xảy ra lỗi",
  });
});

const getMultiDataSanPham = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  console.log(pid);
  const multiData = await Phong.findById(pid).populate(
    "IDLoaiPhong",
    fieldsLoaiPhong
  );
  return res.status(200).json({
    success: multiData ? true : false,
    data: multiData,
  });
});

const update = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { maSanPham, maLoaiSanPham, tenSanPham, hinhAnh } = req.body;

  if (!maLoaiSanPham || !maSanPham || !tenSanPham || !hinhAnh)
    return res.status(400).json({
      success: false,
      mes: "Thiếu trường dữ liệu",
    });

  const loaiSP = await loaiSanPham.findOne({ maLoaiSanPham: maLoaiSanPham });

  if (!loaiSP) throw new Error("Loại sản phẩm không tồn tại");

  const response = await Phong.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  return res.status(200).json({
    success: response ? true : false,
    mes: response ? response : "Đã xảy ra lỗi",
  });
});

const remove = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new Error("Không tìm thấy sản phẩm");

  // const findPhong = await Phong.findById(id);

  // if (findPhong.LichDat.length > 0) {
  //   return res.status(200).json({
  //     success: false,
  //     mes: "Không thể xoá vì phòng đã có lịch sử đơn đặt",
  //   });
  // }

  // if (images) {
  //   const arrImgId = images.split(",");
  //   if (arrImgId?.length > 0)
  //     for (let i = 1; i < arrImgId?.length; i++) {
  //       let item = arrImgId[i].split("AnhOctHotel/")[1];
  //       item = "AnhOctHotel/" + arrImgId[i]?.split(".")[0];
  //       if (item) {
  //         await cloudinary.uploader.destroy(item);
  //       }
  //     }
  // }

  const result = await sanPham.findByIdAndDelete(id);

  return res.status(200).json({
    success: result ? true : false,
    mes: result ? "Xoá sản phẩm thành công" : "Đã xảy ra lỗi!!!",
  });
});

module.exports = {
  create,
  getAll,
  getSanPham,
  getById,
  getMultiDataSanPham,
  update,
  remove,
};
