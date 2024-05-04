const express = require("express");

const AdminController = require("../app/controllers/AdminController");
const ApiController = require("../app/controllers/ApiController");
const SiteController = require("../app/controllers/SiteController");
const router = express.Router();

// routes admin
// /admin/room
router.get("/admin/room", AdminController.room);
router.get("/admin/quanlykhachthue", AdminController.quanLyKhachThue);
router.get("/admin/themKhach", AdminController.themKhach);
router.get("/admin/hopdong", AdminController.hopdong);

// routes user
router.get("/", SiteController.index);
// routes api
router.post("/api/themKhachThue", ApiController.themKhachThue);
router.post("/api/themPhong", ApiController.themPhong);
router.post("/api/themTienNghi", ApiController.themTienNghi);
router.post("/api/luuHopdong", ApiController.luuHopdong);

// test api
router.post("/api/themHopDong", ApiController.themHopDong);

module.exports = router;
