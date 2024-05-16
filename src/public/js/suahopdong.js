$(document).ready(function () {
  $("#chonPhong").change(function () {
    var roomPrice = $("option:selected", this).data("price");
    $("#giaPhong").val(roomPrice);
  });
  $("#addGuest").click(function () {
    var guestName = $("#themkhach").val();
    var guestId = $("#guestNames option")
      .filter(function () {
        return $(this).html() === guestName;
      })
      .data("id");
    var isDuplicated = false;

    $(".guest-name span").each(function () {
      if ($(this).html() === guestName) {
        isDuplicated = true;
        return false;
      }
    });

    // if (!isDuplicated) {
    //   alert("Khách đã được chọn!");
    //   $("#themkhach").val("");
    if (!guestName || !guestId) {
      alert("Vui lòng chọn một khách");
    } else {
      var guestHTML =
        '<div class="guest-name d-flex align-items-center"><button type="button" class="btn btn-danger btn-sm removeGuest">Xóa</button> ' +
        '<span class="ml-2">' +
        guestName +
        '</span><input type="hidden" name="idTenants" value="' +
        guestId +
        '"></div>';

      $("#guestList").append(guestHTML);
      $("#themkhach").val("");
    }
  });

  // Xóa khách
  $(document).on("click", ".removeGuest", function (e) {
    e.preventDefault();
    $(this).closest(".guest-name").remove();
    checkRequired(); // Kiểm tra lại thuộc tính 'required' khi xóa khách
  });
  // xoa tên khách thuê
  $(document).ready(function () {
    $(".delete-tenant").on("click", function () {
      $(this).closest(".row").find("input").val("");
    });
  });
  $(".delete-tenant").on("click", function () {
    $(this).closest(".row").remove();
  });
});
