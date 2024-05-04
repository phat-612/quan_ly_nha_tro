$(document).ready(function () {
  // Thêm khách.
  $("#addGuest").click(function () {
    var guestName = $("#form6Example1").val();
    if (guestName) {
      var guestHTML =
        '<div class="guest-name"><button type="button" class="btn btn-danger btn-sm removeGuest">Xóa</button> ' +
        guestName +
        ' <input type="text" class="form-control ml-2 d-inline-block" style="width: auto;" placeholder="Nhập CCCD/CMND"></input> ' +
        "</div>";
      $("#guestList").append(guestHTML);
      $("#form6Example1").val("");
    }
  });

  // Xóa khách.
  $(document).on("click", ".removeGuest", function (e) {
    e.preventDefault();
    $(this).parent(".guest-name").remove();
  });
});
