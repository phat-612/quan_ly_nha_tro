const mongoose = require("mongoose");
const Tenant = require("../models/Tenant");
const Amenity = require("../models/Amenity");
const Room = require("../models/Room");
const Contract = require("../models/Contract");
const infoHostel = require("../models/InfoHostel");
const DetailContract = require("../models/DetailContract");
const { response } = require("express");
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
    res.render("admin/themkhach", { layout: "admin", js: "themkhach" });
  }
  quanLyKhachThue(req, res) {
    Tenant.find({}).then((tenants) => {
      tenants = tenants.map((tenant) => tenant.toObject());
      // tìm khách ở phòng nào
      const promise = tenants.map((tenant) => {
        return Contract.find({
          idTenants: tenant._id,
          startDate: { $lte: new Date() },
          endDate: { $gte: new Date() },
        })
          .populate("idRoom", "roomNumber")
          .then((contracts) => {
            const roomNumbers = contracts.map((contract) => {
              return contract.idRoom.roomNumber;
            });
            tenant.roomNumbers = roomNumbers;
            return tenant;
          });
      });
      Promise.all(promise).then((data) => {
        // console.log(data);
        res.render("admin/quanLyKhach", {
          layout: "admin",
          tenants: data,
        });
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
      .populate("idRoom", "roomNumber")
      .then((hopdong) => {
        hopdong.forEach((hd) => {
          hd.images = hd.images.join(",");
        });

        res.render("admin/showhopdong", {
          title: "Danh sách hợp đồng",
          layout: "admin",
          js: "showhopdong",
          hopdong: hopdong.map((hopdong) => hopdong.toObject()),
        });
      });
  }
  hopdong(req, res) {
    Room.find({ isEmpty: true }).then((rooms) => {
      Tenant.find({}).then((tenants) => {
        res.render("admin/hopdong", {
          title: "Tạo Hợp Đồng",
          layout: "admin",
          js: "hopdong",
          tenants: tenants.map((tenant) => tenant.toObject()),
          rooms: rooms.map((room) => room.toObject()),
        });
      });
    });
  }
  xemhopdong(req, res) {
    Contract.findById(req.params.id).then((contract) => {
      res.render("admin/xemhopdong", {
        layout: "admin",
        contract: contract.toObject(),
      });
    });
  }
  edithopdong(req, res) {
    Contract.findById(req.params.id)
      .populate("idRoom", "roomNumber")
      .populate("idTenants", "name")
      .then((contract) => {
        DetailContract.findOne({
          idContract: req.params.id,
        }).then((detailcontract) => {
          Room.find({
            $or: [{ isEmpty: true }, { _id: contract.idRoom }],
          }).then((rooms) => {
            Tenant.find().then((tenants) => {
              // truy vấn tất cả phòng
              res.render("admin/edithopdong", {
                title: "Chi Tiết Hợp Đồng",
                layout: "admin",
                js: "suahopdong",
                contract: contract.toObject(),
                detailcontract: detailcontract.toObject(),
                tenants: tenants.map((tenant) => tenant.toObject()),
                rooms: rooms.map((room) => room.toObject()), // danh sách phòng
              });
            });
          });
        });
      });
  }
  chotThang(req, res) {
    DetailContract.aggregate([
      {
        $sort: {
          createdAt: -1, // sắp xếp theo thời gian tạo giảm dần
        },
      },
      {
        $match: {
          total: { $exists: false },
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
      {
        $project: {
          roomNumber: "$room.roomNumber",
          oldElectric: 1,
          oldWater: 1,
          startDate: 1,
          endDate: 1,
          idContract: 1,
        },
      },

      {
        $group: {
          _id: "$idContract", // nhóm theo idContract
          detailContract: {
            $first: "$$ROOT", // lấy ra chi tiết hợp đồng mới nhất
          },
        },
      },
    ]).then((data) => {
      data = data.map((item) => item.detailContract);
      // return res.json(data);
      res.render("admin/chotThang", {
        layout: "admin",
        js: "chotThang",
        detailContracts: data,
      });
    });
  }
  thanhToan(req, res) {
    const filterStatus = req.query.status || "all";
    let matchCondition = {
      total: { $exists: true },
    };
    if (filterStatus !== "all") {
      matchCondition.isPaid = filterStatus == "true" ? true : false;
    }
    DetailContract.aggregate([
      {
        $match: matchCondition,
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
      {
        $project: {
          roomNumber: "$room.roomNumber",
          total: 1,
          startDate: 1,
          endDate: 1,
          idContract: 1,
          oldElectric: 1,
          newElectric: 1,
          oldWater: 1,
          newWater: 1,
          isPaid: 1,
          createdAt: 1,
        },
      },
      {
        $sort: {
          isPaid: 1,
          createdAt: -1,
          roomNumber: 1,
        },
      },
    ]).then((detailContracts) => {
      res.render("admin/thanhToan", {
        layout: "admin",
        js: "thanhToan",
        detailContracts,
        filterStatus,
      });
    });
  }
  showTienNghi(req, res) {
    Amenity.find({}).then((amenities) => {
      amenities = amenities.map((amenitie) => amenitie.toObject());
      const arrPromise = amenities.map((amenity) => {
        return Room.find({
          amenities: {
            $elemMatch: {
              idAmenitie: new mongoose.Types.ObjectId(amenity._id),
              quantity: { $gt: 0 },
            },
          },
        }).then((rooms) => {
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

  infoHostel(req, res, next) {
    infoHostel.findOne({}).then((infohostel) => {
      res.render("admin/infoHostel", {
        layout: "admin",
        js: "infoHostel",
        infohostel: infohostel.toObject(),
      });
    });
  }
}

module.exports = new AdminController();
