module.exports = {
  isSelected: function (value, option) {
    return !!value == !!option ? "selected" : "";
  },

  showStatusRoom: function (value) {
    return value ? "Phòng Trống" : "Đã Thuê";
  },
  toLocaleString: function (timestamp) {
    let date = new Date(timestamp);
    return date.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
  },
};
