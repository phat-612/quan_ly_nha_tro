const moment = require("moment");

module.exports = {
  consoleHbs: function (value) {
    console.log(value);
  },
  compare: (a, b) => {
    return a == b;
  },
  showNumber: function (value) {
    return value.toLocaleString("vi-VN");
  },
  showSTT: function (value) {
    return parseInt(value) + 1;
  },
  showGioiTinh: function (gender) {
    return gender ? "Nữ" : "Nam";
  },
  hiddenElement: function (bool) {
    return bool ? "hidden" : "";
  },
  selectedOption: function (value, option) {
    return value == option ? "selected" : "";
  },
  isSelected: function (value, option) {
    return !!value == !!option ? "selected" : "";
  },
  isSelectedObjectId: function (value, option) {
    return value.toString() == option.toString() ? "selected" : "";
  },
  showDate: function (date) {
    // 2024-03-21
    let tempDate = `${date.getFullYear()}-`;
    if (date.getMonth() + 1 < 10) {
      tempDate += `0${date.getMonth() + 1}-`;
    } else {
      tempDate += `${date.getMonth() + 1}-`;
    }
    if (date.getDay() < 10) {
      tempDate += `0${date.getDay()}`;
    } else {
      tempDate += `${date.getDay()}`;
    }
    return tempDate;
  },
  showStatusRoom: function (value) {
    return value ? "Phòng Trống" : "Đã Thuê";
  },
  toLocaleString: function (timestamp) {
    let date = new Date(timestamp);
    let options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("vi-VN", options);
  },
  formatDate: function (date, format) {
    const dateMoment = moment(date);
    return dateMoment.format(format);
  },
  showImgUpload: (img) => {
    if (typeof img == "object") {
      img = img[0];
    }
    if (img) {
      return `/${process.env.PATH_IMG_UPLOAD}/${img}`;
    }
    return "";
  },
  statusContract: function (value) {
    return value ? "Còn hạn" : "Hết hạn";
  },
};
