const Tenant = require("../models/Tenant");
const Amenity = require("../models/Amenity");
const Room = require("../models/Room");
const Contract = require("../models/Contract");
const DetailContract = require("../models/DetailContract");
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
      tenants = tenants.map((tenant) => tenant.toObject());
      // tìm khách ở phòng nào
      const promise = tenants.map((tenant) => {
        return Contract.find({
          idTenants: tenant._id,
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
        res.render("admin/showhopdong", {
          layout: "admin",
          hopdong: hopdong.map((hopdong) => hopdong.toObject()),
        });
      });
  }
  hopdong(req, res) {
    Room.find({ isEmpty: true }).then((rooms) => {
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
  edithopdong(req, res) {
    Contract.findById(req.params.id)
      .populate("idRoom", "roomNumber")
      .populate("idTenants", "name")
      .then((contract) => {
        DetailContract.findOne({
          idContract: req.params.id,
        }).then((detailcontract) => {
          Room.find().then((rooms) => {
            // truy vấn tất cả phòng
            res.render("admin/edithopdong", {
              layout: "admin",
              js: "suahopdong",
              contract: contract.toObject(),
              detailcontract: detailcontract.toObject(),
              rooms: rooms.map((room) => room.toObject()), // thêm danh sách phòng
            });
          });
        });
      });
  }
  chotThang(req, res) {
    DetailContract.aggregate([
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
    ]).then((data) => {
      res.render("admin/chotThang", {
        layout: "admin",
        js: "chotThang",
        detailContracts: data,
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
