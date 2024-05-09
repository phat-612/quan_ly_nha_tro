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
  xoaKhachThue(req, res) {
    const id = req.params.id;
    Contract.findOne({ idTenants: id }).then((contract) => {
      if (contract) {
        // thông báo không thể xóa
        return res.redirect("back");
      }
      Tenant.deleteOne({ _id: id }).then(() => {
        res.redirect("back");
      });
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
  // api phong =======================================
  ///api them phong
  themPhong(req, res, next) {
    const room = new Room(req.body);
    room.save().then(() => {
      res.redirect("back");
    });
  }
  ///api cap nhat phong
  updatePhong(req, res, next) {
    Room.updateOne(
      {
        _id: req.body.id,
      },
      {
        roomNumber: req.body.roomNumber,
        floor: req.body.floor,
        area: req.body.area,
        capacity: req.body.capacity,
        price: req.body.price,
        idAmenities: req.body.idAmenities,
        description: req.body.description,
      }
    ).then(() => {
      res.redirect("back");
    });
  }
  // api test =========================================
  themHopDong(req, res) {
    const data = req.body;
    const newContract = new Contract(data);
    newContract
      .save()
      .then((response) => {
        const startDate = new Date(data.startDate);
        let endDateYear =
          startDate.getMonth() == 11 ? 1 : 0 + startDate.getFullYear();
        console.log(endDateYear);
        let endDateMonth =
          startDate.getDate() >= 15 ? 1 : 0 + startDate.getMonth();
        endDateMonth = startDate.getMonth() == 11 ? 0 : endDateMonth;
        console.log(endDateMonth);
        const endDate =
          startDate.getMonth() === 11
            ? new Date(endDateYear, endDateMonth, 15)
            : new Date(endDateYear, endDateMonth, 15);
        console.log(endDate);
        const newDetailContract = new DetailContract({
          idContract: response._id,
          oldElectric: data.oldElectric,
          oldWater: data.oldWater,
          startDate: data.startDate,
          endDate,
        });
        return newDetailContract.save();
      })
      .then(() => {
        const roomPromise = Room.findById(data.idRoom);
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
  updatehopdong(req, res) {
    // Contract.updateOne(
    //   { _id: req.body.id },
    //   {
    //     idRoom: req.body.idRoom,
    //     roomPice: req.body.roomPrice,
    //     electricPrice: req.body.electricPrice,
    //     waterPrice: req.body.waterPrice,
    //     deposit: req.body.deposit,
    //   }
    // ).then(() => {
    //   res.redirect("/admin/showhopdong");
    // });
    res.send(req.body);
  }
  chotThang(req, res) {
    const data = req.body;
    // return res.json(data);
    const idDetailContract = data.idDetailContract;
    const idContract = data.idContract;
    const oldElectric = parseInt(data.oldElectric);
    const oldWater = parseInt(data.oldWater);
    const newElectric = parseInt(data.newElectric);
    const newWater = parseInt(data.newWater);
    Contract.findOne({
      _id: idContract,
    }).then((contract) => {
      const total =
        (newElectric - oldElectric) * contract.electricPrice +
        (newWater - oldWater) * contract.waterPrice +
        contract.roomPrice;
      // cập nhật chi tiết hợp đồng
      DetailContract.findOneAndUpdate(
        {
          _id: idDetailContract,
        },
        {
          total,
          newElectric: data.newElectric,
          newWater: data.newWater,
          paid: 0,
        },
        {
          new: true,
        }
      ).then((updatedDocument) => {
        // tạo chi tiết hợp đồng mới
        const contractEndDate = contract.endDate;
        const startDateDetail = updatedDocument.endDate;
        if (startDateDetail >= contractEndDate) {
          return res.redirect("/admin/chotThang");
        }
        let endDateDetailDay = updatedDocument.endDate.getDate();
        let endDateDetailMonth = updatedDocument.endDate.getMonth();
        let endDateDetailYear = updatedDocument.endDate.getFullYear();
        let endDateDetail =
          endDateDetailMonth === 11
            ? new Date(endDateDetailYear + 1, 0, endDateDetailDay)
            : new Date(
                endDateDetailYear,
                endDateDetailMonth + 1,
                endDateDetailDay
              );
        endDateDetail =
          endDateDetail >= contractEndDate ? contractEndDate : endDateDetail;
        const newDetailContract = new DetailContract({
          idContract: idContract,
          oldElectric: newElectric,
          oldWater: newWater,
          startDate: updatedDocument.endDate,
          endDate: endDateDetail,
          isLastDetail: endDateDetail >= contractEndDate,
        });
        newDetailContract.save().then(() => {
          res.redirect("/admin/chotThang");
        });
      });
    });
  }
}

module.exports = new ApiController();
