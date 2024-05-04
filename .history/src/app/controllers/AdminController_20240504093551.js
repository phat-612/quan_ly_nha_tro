const Tenant = require("../models/Tenant");
const Amenity = require("../models/Amenity");
const Room = require("../models/Room");
class AdminController {
  themKhach(req, res) {
    res.render("admin/themkhach", { layout: "admin" });
  }
  room(req, res, next) {
    Room.find({}).then((rooms) => {
      Amenity.find({}).then((amenities) => {
        res.render("admin/room", {
          layout: "admin",
          js: "room",
          amenities: amenities.map((amenitie) => amenitie.toObject()),
          rooms: rooms.map((room) => room.toObject()),
        });
      });
    });
  }
  quanLyKhachThue(req, res) {
    Tenant.find({}).then((tenants) => {
      res.render("admin/quanLyKhach", {
        layout: "admin",
        tenants: tenants.map((tenant) => tenant.toObject()),
      });
    });
  }
  hopdong(req, res) {
    res.render("admin/hopdong");
  }
}

module.exports = new AdminController();
