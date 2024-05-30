const express = require("express");
const multer = require("multer");
const path = require("path");
const AdminController = require("../app/controllers/AdminController");
const ApiController = require("../app/controllers/ApiController");
const SiteController = require("../app/controllers/SiteController");

const { isLogin, logined } = require("../app/middlewares/auth");

const router = express.Router();
// cấu hình multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
// end cấu hình multer

// router login

router.get("/login", logined, SiteController.login);

// routes admin
router.get("/admin", AdminController.home);

// /admin/infoHostel
router.get("/admin/infoHostel", AdminController.infoHostel);

// /admin/room
router.get("/admin/room", AdminController.room);

// //admin Khach
router.get("/admin/quanlykhachthue", AdminController.quanLyKhachThue);
router.get("/admin/xemThongTinKhach/:id", AdminController.xemThongTinKhach);
router.get("/admin/themKhach", AdminController.themKhach);
router.get("/admin/suaThongTinKhach/:id", AdminController.suaThongTinKhach);

// //admin Hop Dong
router.get("/admin/hopdong", AdminController.hopdong);
router.get("/admin/xemhopdong/:id", AdminController.xemhopdong);

router.get("/admin/showhopdong", AdminController.showhopdong);
router.get("/admin/edithopdong/:id", AdminController.edithopdong);

// //admin Chot Thang
router.get("/admin/chotThang", AdminController.chotThang);

// //admin Thanh Toan
router.get("/admin/thanhToan", AdminController.thanhToan);
router.get("/api/exportBill", ApiController.exportBill);

// //admin Tien Nghi
router.get("/admin/showTienNghi", AdminController.showTienNghi);

// routes user
router.get("/", SiteController.index);
router.get("/home", SiteController.home);

// routes api =================================================================================================================================
router.post("/api/login", ApiController.login);
router.post("/api/changePassword", ApiController.changePassword);
// // api Khach
router.post(
  "/api/themKhachThue",
  upload.array("idcs"),
  ApiController.themKhachThue
);
router.post("/api/suaThongTinKhach/:id", ApiController.suaThongTinKhach);
router.post("/api/xoaKhachThue/:id", ApiController.xoaKhachThue);
// // api phong`
router.post("/api/themPhong", ApiController.themPhong);
router.post("/api/xoaPhong", ApiController.xoaPhong);
router.post("/api/updatePhong", ApiController.updatePhong);
// // api tien nghi
router.post("/api/themTienNghi", ApiController.themTienNghi);
router.post("/api/suaTienNghi/:id", ApiController.suaTienNghi);
router.post("/api/xoaTienNghi/:id", ApiController.xoaTienNghi);
// // api hopdong
router.post(
  "/api/themHopDong",
  upload.array("images"),
  ApiController.themHopDong
);
router.post("/api/updatehopdong/:id", ApiController.updatehopdong);
router.post("/api/xoahopdong/:id", ApiController.xoahopdong);
router.get("/api/exportContract", ApiController.exportContract);
// // api chot thang
router.post("/api/chotThang", ApiController.chotThang);
// // api thanh toan
router.post("/api/thanhToan", ApiController.thanhToan);

// // api cap nhat thong tin phong` tro

router.post("/api/updateInfoHostel", ApiController.updateInfoHostel);

module.exports = router;
