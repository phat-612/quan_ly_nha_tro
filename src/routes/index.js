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

// routes user
router.get("/", SiteController.index);
// routes api
router.post("/api/themKhachThue", ApiController.themKhachThue);

module.exports = router;
