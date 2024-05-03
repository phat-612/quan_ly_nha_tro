const Tenant = require("../models/Tenant");

class AdminController {
  themKhach(req, res) {
    res.render("admin/themkhach", { layout: "admin" });
  }
  room(req, res, next) {
    res.render("admin/room", { layout: "admin" });
  }
  quanLyKhachThue(req, res) {
    Tenant.find({}).then((tenants) => {
      res.render("admin/quanLyKhach", {
        layout: "admin",
        tenants: tenants.map((tenant) => tenant.toObject()),
      });
    });
  }
}

module.exports = new AdminController();
