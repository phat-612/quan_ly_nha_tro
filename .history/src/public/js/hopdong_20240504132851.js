$(document).ready(function () {
  // Xử lý sự kiện khi chọn phòng
  $("#chonPhong").change(function () {
    var selectedOption = $(this).children("option:selected");
    var roomPrice = selectedOption.val();
    $("#giaPhong").val(roomPrice);
  });

  // Thêm khách
  $("#addGuest").click(function () {
    var guestId = $("#form6Example1").val(); // Gỉa sử form6Example1 lưu giữ id chứ không phải tên
    var guestName = $("#form6Example1 option:selected").text(); // Giả sử đây là drop-down chọn khách với giá trị là id và text là tên

    if (guestId) {
      // Kiểm tra id chứ không phải tên
      var guestHTML =
        '<div class="guest-name d-flex align-items-center"><button type="button" class="btn btn-danger btn-sm removeGuest">Xóa</button> ' +
        '<span class="ml-2">' +
        guestName +
        '</span><input type="hidden" name="tenantId" value="' +
        guestId +
        '"></div>';
      $("#guestList").append(guestHTML);
      $("#form6Example1").val("");
    }
  });

  // Xóa khách
  $(document).on("click", ".removeGuest", function (e) {
    e.preventDefault();
    $(this).closest(".guest-name").remove();
  });

  // Xử lý form khi nó được gửi
  $("#themHopdong").submit(function (e) {
    e.preventDefault();

    // Gửi yêu cầu đến server
    this.submit();
  });
});
