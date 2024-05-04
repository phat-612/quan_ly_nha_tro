$(document).ready(function () {
  // Thêm khách
  $("#addGuest").click(function () {
    var guestName = $("#form6Example1").val();
    if (guestName) {
      var guestHTML =
        '<div class="guest-name d-flex align-items-center"><button type="button" class="btn btn-danger btn-sm removeGuest">Xóa</button> ' +
        '<span class="ml-2">' +
        guestName +
        "</span>" +
        '<input style="width: 200px;" name="CCCD" type="text" class="form-control ml-2" placeholder="Nhập CCCD/CMND"></input> ' +
        '<input style="width: 200px;" name="Phone" type="text" class="form-control ml-2" placeholder="Nhập SĐT"></input> ' +
        "</div>";
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

    // Lấy dữ liệu từ form
    var formData = $(this).serialize();

    // Gửi yêu cầu POST đến server
    $.ajax({
      type: "POST",
      url: "/api/luuHopdong",
      data: formData,
      success: function (response) {
        // Xử lý phản hồi thành công từ server
        console.log("Hợp đồng đã được lưu thành công!");
      },
      error: function (xhr, status, error) {
        // Xử lý lỗi từ server
        console.error("Đã xảy ra lỗi: " + error);
      },
    });
  });
});
