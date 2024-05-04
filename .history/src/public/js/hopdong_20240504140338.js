$(document).ready(function () {
  // Xử lý sự kiện khi chọn phòng
  $("#chonPhong").change(function () {
    var roomPrice = $("option:selected", this).data("price");
    $("#giaPhong").val(roomPrice);
  });

  // Thêm khách
  $("#addGuest").click(function () {
    // Lấy giá trị id từ thuộc tính data-id của option được chọn
    var guestId = $("#form6Example1").find(":selected").data("id");
    var guestName = $("#form6Example1").val();

    if (guestId) {
      var guestHTML =
        '<div class="guest-name d-flex align-items-center"><button type="button" class="btn btn-danger btn-sm removeGuest">Xóa</button> ' +
        '<span class="ml-2">' +
        guestName +
        '</span><input type="hidden" name="tenantId" value="' +
        guestId +
        '"></div>';

      $("#guestList").append(guestHTML);
      // Reset giá trị sau khi đã lấy
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

    this.submit();
  });
});
