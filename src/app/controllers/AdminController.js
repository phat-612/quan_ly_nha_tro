const Tenant = require("../models/Tenant");
const Amenity = require("../models/Amenity");
const Room = require("../models/Room");
const Contract = require("../models/Contract");
class AdminController {
  home(req, res) {
    res.render("admin/home", { layout: "admin" });
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
  themKhach(req, res) {
    res.render("admin/themkhach", { layout: "admin" });
  }
  quanLyKhachThue(req, res) {
    Tenant.find({}).then((tenants) => {
      // tìm khách ở phòng nào
      tenants.forEach((tenant) => {
        Contract.find({
          idAmenities: tenant._id,
        }).then((contracts) => {
          const roomIds = contracts.map((contract) => contract.roomId);
          // console.log("----------------");
          // console.log(tenant.name);
          // console.log(roomIds);
          // console.log("----------------");
        });
      });
      res.render("admin/quanLyKhach", {
        layout: "admin",
        tenants: tenants.map((tenant) => tenant.toObject()),
      });
    });
  }
  xemThongTinKhach(req, res) {
    const id = req.params.id;
    Tenant.findOne({ _id: id }).then((tenant) => {
      res.render("admin/xemttkhach", {
        layout: "admin",
        tenant: tenant.toObject(),
      });
    });
  }
  suaThongTinKhach(req, res) {
    const id = req.params.id;
    Tenant.findOne({ _id: id }).then((tenant) => {
      res.render("admin/suattkhach", {
        layout: "admin",
        tenant: tenant.toObject(),
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
  showTienNghi(req, res) {
    Amenity.find({}).then((amenities) => {
      amenities = amenities.map((amenitie) => amenitie.toObject());
      const arrPromise = amenities.map((amenity) => {
        return Room.find({ idAmenities: amenity._id }).then((rooms) => {
          amenity.isUsed = false;
          if (rooms.length > 0) {
            amenity.isUsed = true;
          }
          return amenity;
        });
      });
      Promise.all(arrPromise).then((data) => {
        res.render("admin/showTienNghi", {
          layout: "admin",
          js: "showTienNghi",
          amenities: data,
        });
      });
    });
  }
}

module.exports = new AdminController();
