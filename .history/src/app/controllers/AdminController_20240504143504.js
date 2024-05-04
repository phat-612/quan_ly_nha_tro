const Tenant = require("../models/Tenant");
const Amenity = require("../models/Amenity");
const Room = require("../models/Room");
const Contract = require("../models/Contract");
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
  showhopdong(req, res) {
    Contract.find({})
      .populate("roomId", "roomNumber")
      .then((hopdong) => {
        res.render("admin/showhopdong", {
          layout: "admin",
          hopdong: hopdong.map((hopdong) => hopdong.toObject()),
        });
      });
  }
  hopdong(req, res) {
    Room.find({}).then((rooms) => {
      Tenant.find({}).then((tenants) => {
        res.render("admin/hopdong", {
          layout: "admin",
          js: "hopdong",
          tenants: tenants.map((tenant) => tenant.toObject()),
          rooms: rooms.map((room) => room.toObject()),
        });
      });
    });
  }
}

module.exports = new AdminController();