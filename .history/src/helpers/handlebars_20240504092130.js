module.exports = {
  isSelected: function (value, option) {
    return !!value == !!option ? "selected" : "";
  },

  showStatusRoom: function (value) {
    return value ? "Phòng Trống" : "Đã Thuê";
  },
};
