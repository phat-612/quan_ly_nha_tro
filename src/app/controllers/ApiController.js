var pdf = require("pdf-creator-node");
var fs = require("fs");
const mongoose = require("mongoose");
const moment = require("moment");
const path = require("path");
const Tenant = require("../models/Tenant");
const Amenity = require("../models/Amenity");
const Contract = require("../models/Contract");
const DetailContract = require("../models/DetailContract");
const Room = require("../models/Room");
const InfoHostel = require("../models/InfoHostel");
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
    let id = req.params.id;
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
    let id = req.params.id;
    Contract.findOne({ idTenants: id }).then((contract) => {
      if (contract) {
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
    return res.send(req.body);
    Room.findOne({ roomNumber: req.body.roomNumber }).then((room) => {
      if (room) {
        req.flash("error_msg", "Tên phòng đã tồn tại");
        res.redirect("back");
      } else {
        const newRoom = new Room(req.body);
        newRoom.save().then(() => {
          req.flash("success_msg", "Phòng đã được thêm thành công");
          res.redirect("back");
        });
      }
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
        amenities: req.body.amenities,
        description: req.body.description,
      }
    ).then(() => {
      res.redirect("back");
    });
  }
  xoaPhong(req, res, next) {
    Contract.findOne({ idRoom: req.body }).then((contract) => {
      console.log(contract);
      if (contract) {
        req.flash("error_msg", "Phòng đã tồn tại trong hợp đồng");
        res.redirect("back");
      } else {
        Room.deleteOne(req.body).then(() => {
          res.redirect("back");
        });
      }
    });
  }
  // api test =========================================
  themHopDong(req, res) {
    // return res.send(req.body);
    const data = req.body;
    let images = [];
    if (req.files && Array.isArray(req.files)) {
      images = req.files.map((file) => {
        return file.filename;
      });
    }
    data.images = images;
    const newContract = new Contract(data);
    newContract
      .save()
      .then((response) => {
        const startDate = new Date(data.startDate);
        // edndate ngày tháng năm kết thúc của tháng đầu tiên hợp đồng
        let endDateYear =
          startDate.getMonth() == 11 && startDate.getDay() >= 15
            ? 1
            : 0 + startDate.getFullYear(); //ngày nhỏ hơn 15  của tháng 12
        let endDateMonth =
          startDate.getDay() >= 15 ? 1 : 0 + startDate.getMonth();
        endDateMonth = endDateMonth == 12 ? 0 : endDateMonth;
        const endDate = new Date(endDateYear, endDateMonth, 15);
        console.log(endDateYear, endDateMonth, endDate);
        const newDetailContract = new DetailContract({
          idContract: response._id,
          oldElectric: data.oldElectric,
          oldWater: data.oldWater,
          startDate: data.startDate,
          endDate,
          isFirstDetail: true,
        });
        return newDetailContract.save();
      })
      .then(() => {
        Room.findById(data.idRoom).then((room) => {
          if (room) {
            room.isEmpty = false;
            return room.save();
          }
        });
        res.redirect("/admin/showhopdong");
      });
  }
  updatehopdong(req, res) {
    // return res.send(req.body);
    Contract.updateOne(
      { _id: req.params.id },
      {
        $set: {
          idTenants: req.body.idTenants,
          idRoom: req.body.idRoom,
          roomPrice: req.body.roomPrice,
          electricPrice: req.body.electricPrice,
          waterPrice: req.body.waterPrice,
          deposit: req.body.deposit,
        },
      }
    ).then(() => {
      res.redirect("/admin/showhopdong");
    });
  }
  xoahopdong(req, res) {
    const filePath = path.join(__dirname, "..", "..", "public", "uploads");
    Contract.findOne({ _id: req.params.id }).then((contract) => {
      if (!contract) {
        res.send("không tìm thấy");
      } else {
        // Kiểm tra xem contract.images có phải là mảng không
        if (Array.isArray(contract.images)) {
          contract.images.forEach((image) => {
            const fullPath = path.join(filePath, image);
            if (fs.existsSync(fullPath)) {
              fs.unlinkSync(fullPath); // delete the file
            }
          });
        } else {
          const fullPath = path.join(filePath, contract.images);
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath); // delete the file
          }
        }

        if (contract) {
          Promise.all([
            Room.updateOne({ _id: contract.idRoom }, { isEmpty: true }),
            Contract.deleteOne({ _id: req.params.id }),
            DetailContract.deleteMany({ idContract: req.params.id }),
          ]).then(() => {
            res.redirect("back");
          });
        } else {
          console.log("Không tìm thấy hợp đồng");
        }
      }
    });
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
    DetailContract.findOne({
      _id: idDetailContract,
    })
      .populate(
        "idContract",
        "roomPrice idRoom electricPrice waterPrice endDate"
      )
      .then((detailContract) => {
        let roomPrice = detailContract.idContract.roomPrice;
        let electricPrice = detailContract.idContract.electricPrice;
        let waterPrice = detailContract.idContract.waterPrice;
        if (detailContract.isFirstDetail || detailContract.isLastDetail) {
          let countDay = Math.ceil(
            (detailContract.endDate.getTime() -
              detailContract.startDate.getTime()) /
              (1000 * 3600 * 24)
          );
          roomPrice = (roomPrice / 30) * countDay;
        }
        console.log(roomPrice, electricPrice, waterPrice);
        const total =
          (newElectric - oldElectric) * electricPrice +
          (newWater - oldWater) * waterPrice +
          roomPrice;
        // cập nhật chi tiết hợp đồng
        DetailContract.findOneAndUpdate(
          {
            _id: idDetailContract,
          },
          {
            total,
            newElectric: data.newElectric,
            newWater: data.newWater,
          },
          {
            new: true,
          }
        ).then((updatedDocument) => {
          // tạo chi tiết hợp đồng mới
          if (updatedDocument.isLastDetail) {
            Room.updateOne(
              { _id: detailContract.idContract.idRoom },
              { isEmpty: true }
            ).then(() => {});
          }
          const contractEndDate = detailContract.idContract.endDate;
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
  thanhToan(req, res) {
    const idDetailContract = req.query.idDetailContract;
    DetailContract.updateOne(
      { _id: idDetailContract },
      {
        isPaid: true,
      }
    ).then(() => {
      res.redirect("back");
    });
  }
  exportContract(req, res) {
    const idContract = req.query.idContract;
    /*
{{renter.name}}{{renter.birthday}}
{{renter.idCard}} Ngày cấp: {{renter.idCardDate}}
{{renter.phone}}
{{tenant.name}} Sinh ngày: {{tenant.birthday}}
{{tenant.idCard}} Ngày cấp: {{tenant.idCardDate}}
{{tenant.phone}}
{{roomPrice}}
{{contract.electricPrice}}
{{contract.waterPrice}}
 {{contract.deposit}}
  {{startDate}} đến ngày {{endDate}}
    */

    const promiseContract = Contract.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(idContract),
        },
      },
      {
        $lookup: {
          from: "tenants",
          localField: "idTenants",
          foreignField: "_id",
          as: "tenant",
        },
      },
      {
        $lookup: {
          from: "rooms",
          localField: "idRoom",
          foreignField: "_id",
          as: "room",
        },
      },
      {
        $unwind: "$room",
      },
    ]);
    const promiseInfoHostel = InfoHostel.findOne({});
    Promise.all([promiseContract, promiseInfoHostel]).then(
      ([contracts, infoHostel]) => {
        let contract = contracts[0];
        const timeNow = new Date().getTime();
        var html = fs.readFileSync(
          path.join(__dirname, "../../public/templates", "contract.html"),
          "utf8"
        );
        var options = {
          format: "A4",
          orientation: "portrait",
          border: "10mm",
        };
        let data = {
          renter: {
            name: infoHostel.nameRenter,
            birthday: moment(infoHostel.birthday).format("DD/MM/YYYY"),
            idCard: infoHostel.idCard,
            idCardDate: moment(infoHostel.idCardDate).format("DD/MM/YYYY"),
            phone: infoHostel.phone,
          },
          tenant: {
            name: contract.tenant[0].name,
            birthday: moment(contract.tenant[0].dayOfBirth).format(
              "DD/MM/YYYY"
            ),
            idCard: contract.tenant[0].cccd.number,
            idCardDate: moment(contract.tenant[0].cccd.date).format(
              "DD/MM/YYYY"
            ),
            phone: contract.tenant[0].phone,
          },
          contract: {
            roomPrice: contract.roomPrice.toLocaleString("vi-VN"),
            electricPrice: contract.electricPrice.toLocaleString("vi-VN"),
            oldElectric: contract.oldElectric.toLocaleString("vi-VN"),
            oldWater: contract.oldWater.toLocaleString("vi-VN"),
            waterPrice: contract.waterPrice.toLocaleString("vi-VN"),
            deposit: contract.deposit.toLocaleString("vi-VN"),
            startDate: moment(contract.startDate).format("DD/MM/YYYY"),
            endDate: moment(contract.endDate).format("DD/MM/YYYY"),
          },
          room: {
            roomNumber: contract.room.roomNumber,
          },
        };

        var document = {
          html: html,
          data,
          path: path.join(
            __dirname,
            "../../public/.download",
            `${timeNow}.pdf`
          ),
          type: "",
        };
        pdf
          .create(document, options)
          .then((resPdf) => {
            res.download(resPdf.filename, (err) => {
              if (err) {
                console.error(err);
              } else {
                fs.unlink(resPdf.filename, (err) => {
                  if (err) throw err;
                });
              }
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    );
  }
  exportBill(req, res) {
    const idDetailContract = req.query.idDetailContract;
    DetailContract.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(idDetailContract),
        },
      },
      {
        $lookup: {
          from: "contracts",
          localField: "idContract",
          foreignField: "_id",
          as: "contract",
        },
      },
      {
        $unwind: "$contract",
      },
      {
        $lookup: {
          from: "rooms",
          localField: "contract.idRoom",
          foreignField: "_id",
          as: "room",
        },
      },
      {
        $unwind: "$room",
      },
    ]).then((detailContract) => {
      // return res.send(data);
      detailContract = detailContract[0];
      const timeNow = new Date().getTime();
      const startDateMoment = moment(detailContract.startDate);
      const endDateMoment = moment(detailContract.endDate);
      var html = fs.readFileSync(
        path.join(__dirname, "../../public/templates", "bill.html"),
        "utf8"
      );
      var options = {
        format: "A5",
        orientation: "landscape",
        border: "10mm",
      };
      let data = {
        period: `Chu kỳ ${startDateMoment.format("MM/YYYY")}`,
        roomNumber: detailContract.room.roomNumber,
        startDate: startDateMoment.format("DD/MM/YYYY"),
        endDate: endDateMoment.format("DD/MM/YYYY"),
        oldElectric: detailContract.oldElectric,
        newElectric: detailContract.newElectric,
        oldWater: detailContract.oldWater,
        newWater: detailContract.newWater,
        electricPrice: detailContract.contract.electricPrice,
        waterPrice: detailContract.contract.waterPrice,
        totalElectric:
          (detailContract.newElectric - detailContract.oldElectric) *
          detailContract.contract.electricPrice,
        totalWater:
          (detailContract.newWater - detailContract.oldWater) *
          detailContract.contract.waterPrice,
        roomPrice: 1000000,
        total: detailContract.total,
      };
      Object.keys(data).forEach((key) => {
        if (typeof data[key] == "number") {
          data[key] = data[key].toLocaleString("vi-VN");
        }
      });
      var document = {
        html: html,
        data,
        path: path.join(
          __dirname,
          "../../public/.download",
          `${detailContract.room.roomNumber}-${timeNow}.pdf`
        ),
        type: "",
      };
      pdf
        .create(document, options)
        .then((resPdf) => {
          res.download(resPdf.filename, (err) => {
            if (err) {
              console.error(err);
            } else {
              fs.unlink(resPdf.filename, (err) => {
                if (err) throw err;
              });
            }
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
  updateInfoHostel(req, res, next) {
    const formData = req.body;
    InfoHostel.findOneAndUpdate(
      { _id: formData._id },
      {
        nameHostel: formData.nameHostel,
        address: formData.address,
        birthday: formData.birthday,
        idCard: formData.idCard,
        idCardDate: formData.idCardDate,
        nameRenter: formData.nameRenter,
        phone: formData.phone,
      }
    ).then(() => {
      res.redirect("back");
    });
  }
}

module.exports = new ApiController();
