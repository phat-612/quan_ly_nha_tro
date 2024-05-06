const express = require("express");

const AdminController = require("../app/controllers/AdminController");
const ApiController = require("../app/controllers/ApiController");
const SiteController = require("../app/controllers/SiteController");
const router = express.Router();

// routes admin
// /admin/room
router.get("/admin", AdminController.home);
router.get("/admin/room", AdminController.room);
router.get("/admin/quanlykhachthue", AdminController.quanLyKhachThue);
router.get("/admin/xemThongTinKhach/:id", AdminController.xemThongTinKhach);
router.get("/admin/themKhach", AdminController.themKhach);
router.get("/admin/suaThongTinKhach/:id", AdminController.suaThongTinKhach);
router.get("/admin/hopdong", AdminController.hopdong);
router.get("/admin/chotThang", AdminController.chotThang);
router.get("/admin/showhopdong", AdminController.showhopdong);
router.get("/admin/edithopdong/:id", AdminController.edithopdong);
router.get("/admin/showTienNghi", AdminController.showTienNghi);

// routes user
router.get("/", SiteController.index);
// routes api
router.post("/api/themKhachThue", ApiController.themKhachThue);
router.post("/api/suaThongTinKhach/:id", ApiController.suaThongTinKhach);
router.post("/api/xoaKhachThue/:id", ApiController.xoaKhachThue);
router.post("/api/themPhong", ApiController.themPhong);
router.post("/api/updatePhong", ApiController.updatePhong);
router.post("/api/themTienNghi", ApiController.themTienNghi);
router.post("/api/suaTienNghi/:id", ApiController.suaTienNghi);
router.post("/api/xoaTienNghi/:id", ApiController.xoaTienNghi);
router.post("/api/updatehopdong/:id", ApiController.updatehopdong);
router.post("/api/chotThang", ApiController.chotThang);

// test api
router.post("/api/themHopDong", ApiController.themHopDong);

module.exports = router;
