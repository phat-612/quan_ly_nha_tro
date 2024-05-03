const Tenant = require("../models/Tenant");
const Amenity = require("../models/Amenity");
const Contract = require("../models/Contract");
const DetailContract = require("../models/DetailContract");
const Room = require("../models/Room");
class ApiController {
  themKhachThue(req, res) {
    const data = {
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      cccd: {
        number: req.body.cccdNumber,
        date: req.body.cccdDate,
      },
      dayOfBirth: req.body.dayOfBirth,
      gender: req.body.gioiTinh,
    };
    const newTenant = new Tenant(data);
    newTenant.save().then(() => {
      res.redirect("/admin/quanlykhachthue");
    });
  }
  // api tiện nghi
  themTienNghi(req, res, next) {
    // return console.log(req.body);
    const datas = req.body.amenities;
    datas.forEach((amenity) => {
      const newAmenity = new Amenity(amenity);
      newAmenity.save();
    });
    res.json({ status: "success" });
  }
  // api phong
  themPhong(req, res, next) {
    const room = new Room(req.body);
    room.save().then(() => {
      res.redirect("back");
    });
  }
  // api test
  themHopDong(req, res) {
    const data = req.body;
    const newContract = new Contract(data);
    newContract.save().then((response) => {
      const startDate = new Date(data.startDate);
      const newDetailContract = new DetailContract({
        idContract: response._id,
        oldElectric: data.oldElectric,
        oldWater: data.oldWater,
        startDate: data.startDate,
        endDate: new Date(
          startDate.getFullYear(),
          startDate.getMonth() + 1,
          startDate.getDate()
        ),
      });
      newDetailContract.save().then(() => {
        res.json({ status: "success" });
      });
    });
  }
}

module.exports = new ApiController();
