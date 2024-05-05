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
      gender: req.body.gender,
    };
    const newTenant = new Tenant(data);
    newTenant.save().then(() => {
      res.redirect("/admin/quanlykhachthue");
    });
  }
  suaThongTinKhach(req, res) {
    const id = req.params.id;
    let fullName = req.body.name;
    let addresss = req.body.address;
    let email = req.body.email;
    let phone = req.body.phone;
    let gender = req.body.gender;
    let dayOfBirth = req.body.dayOfBirth;
    let cccdNumber = req.body.cccdNumber;
    let cccdDate = req.body.cccdDate;
    Tenant.updateOne(
      { _id: id },
      {
        name: fullName,
        address: addresss,
        email: email,
        phone: phone,
        gender: gender,
        dayOfBirth: dayOfBirth,
        cccd: {
          number: cccdNumber,
          date: cccdDate,
        },
      }
    ).then(() => {
      res.redirect("/admin/quanlykhachthue");
    });
  }
  // api tiện nghi
  themTienNghi(req, res) {
    const amenity = new Amenity(req.body);
    amenity.save().then(() => {
      res.redirect("back");
    });
  }
  suaTienNghi(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    Amenity.updateOne(
      { _id: id },
      {
        name: name,
      }
    ).then(() => {
      res.redirect("back");
    });
  }
  xoaTienNghi(req, res) {
    const id = req.params.id;
    const isUsed = req.body.isUsed;
    Amenity.deleteOne({ _id: id }).then(() => {
      if (!isUsed) {
        return res.redirect("back");
      }
      // xóa tiện nghi khỏi phòng
      Room.updateMany(
        {},
        {
          $pull: { idAmenities: id },
        }
      ).then(() => {
        return res.redirect("back");
      });
    });
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
    newContract
      .save()
      .then((response) => {
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
        return newDetailContract.save();
      })
      .then(() => {
        const roomPromise = Room.findById(data.roomId);
        return roomPromise.then((room) => {
          if (room) {
            room.isEmpty = false;
            return room.save();
          }
        });
      })
      .then(() => {
        res.redirect("/admin/showhopdong");
      });
  }
}

module.exports = new ApiController();
