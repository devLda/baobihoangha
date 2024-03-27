const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const sanPhamSchema = new mongoose.Schema(
  {
    maSanPham: {
      type: String,
      required: true
    },
    maLoaiSanPham: {
      type: String,
      required: true,
    },
    tenSanPham: {
      type: String,
      required: true
    },
    hinhAnh: {
      type: Array,
    },
    moTa: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);

sanPhamSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("sanPham", sanPhamSchema);
