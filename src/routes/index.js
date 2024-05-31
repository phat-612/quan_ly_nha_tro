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
router.get("/admin", isLogin, AdminController.home);

// /admin/infoHostel
router.get("/admin/infoHostel", isLogin, AdminController.infoHostel);

// /admin/room
router.get("/admin/room", isLogin, AdminController.room);

// //admin Khach
router.get("/admin/quanlykhachthue", isLogin, AdminController.quanLyKhachThue);
router.get(
  "/admin/xemThongTinKhach/:id",
  isLogin,
  AdminController.xemThongTinKhach
);
router.get("/admin/themKhach", isLogin, AdminController.themKhach);
router.get(
  "/admin/suaThongTinKhach/:id",
  isLogin,
  AdminController.suaThongTinKhach
);

// //admin Hop Dong
router.get("/admin/hopdong", isLogin, AdminController.hopdong);
router.get("/admin/xemhopdong/:id", isLogin, AdminController.xemhopdong);

router.get("/admin/showhopdong", isLogin, AdminController.showhopdong);
router.get("/admin/edithopdong/:id", isLogin, AdminController.edithopdong);

// //admin Chot Thang
router.get("/admin/chotThang", isLogin, AdminController.chotThang);

// //admin Thanh Toan
router.get("/admin/thanhToan", isLogin, AdminController.thanhToan);
router.get("/api/exportBill", isLogin, ApiController.exportBill);

// //admin Tien Nghi
router.get("/admin/showTienNghi", isLogin, AdminController.showTienNghi);

// routes user
router.get("/", SiteController.index);
router.get("/home", SiteController.home);

// routes api =================================================================================================================================
router.post("/api/login", ApiController.login);
router.post("/api/changePassword", ApiController.changePassword);
// // api Khach
router.post(
  "/api/themKhachThue",
  isLogin,
  // multer nhận form có entype multipart/form-data lưu hình vào server
  upload.array("idcs"),
  ApiController.themKhachThue
);
router.post(
  "/api/suaThongTinKhach/:id",
  isLogin,
  ApiController.suaThongTinKhach
);
router.post("/api/xoaKhachThue/:id", isLogin, ApiController.xoaKhachThue);
// // api phong`
router.post("/api/themPhong", isLogin, ApiController.themPhong);
router.post("/api/xoaPhong", isLogin, ApiController.xoaPhong);
router.post("/api/updatePhong", isLogin, ApiController.updatePhong);
// // api tien nghi
router.post("/api/themTienNghi", isLogin, ApiController.themTienNghi);
router.post("/api/suaTienNghi/:id", isLogin, ApiController.suaTienNghi);
router.post("/api/xoaTienNghi/:id", isLogin, ApiController.xoaTienNghi);
// // api hopdong
router.post(
  "/api/themHopDong",
  isLogin,
  upload.array("images"),
  ApiController.themHopDong
);
router.post("/api/updatehopdong/:id", isLogin, ApiController.updatehopdong);
router.post("/api/xoahopdong/:id", isLogin, ApiController.xoahopdong);
router.get("/api/exportContract", isLogin, ApiController.exportContract);
// // api chot thang
router.post("/api/chotThang", isLogin, ApiController.chotThang);
// // api thanh toan
router.post("/api/thanhToan", isLogin, ApiController.thanhToan);

// // api cap nhat thong tin phong` tro

router.post("/api/updateInfoHostel", isLogin, ApiController.updateInfoHostel);

module.exports = router;
