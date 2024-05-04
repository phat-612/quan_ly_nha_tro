$(document).ready(function () {
  // Thêm khách
  $("#addGuest").click(function () {
    var guestName = $("#form6Example1").val();
    if (guestName) {
      var guestHTML =
        '<div class="guest-name d-flex align-items-center"><button type="button" class="btn btn-danger btn-sm removeGuest">Xóa</button> ' +
        '<span class="ml-2">' +
        guestName +
        "</span></div>";
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
