const Tenant = require("../models/Tenant");

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
  // api phong
  themPhong(req, res, next) {
    console.log(req.body);
  }
}

module.exports = new ApiController();
