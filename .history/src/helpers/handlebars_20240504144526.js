module.exports = {
  isSelected: function (value, option) {
    return !!value == !!option ? "selected" : "";
  },

  showStatusRoom: function (value) {
    return value ? "Phòng Trống" : "Đã Thuê";
  },
  toLocaleString: function (timestamp) {
    let date = new Date(timestamp);
    let options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("vi-VN", options);
  },
};
