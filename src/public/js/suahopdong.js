$("#chonPhong").change(function () {
  var roomPrice = $("option:selected", this).data("price");
  $("#giaPhong").val(roomPrice);
});
$("#addGuest").click(function () {
  var guestName = $("#form6Example1").val();
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

  if (guestName && guestId && !isDuplicated) {
    var guestHTML =
      '<div class="guest-name d-flex align-items-center"><button type="button" class="btn btn-danger btn-sm removeGuest">Xóa</button> ' +
      '<span class="ml-2">' +
      guestName +
      '</span><input type="hidden" name="idTenants" value="' +
      guestId +
      '"></div>';

    $("#guestList").append(guestHTML);
    $("#form6Example1").val("");
  } else if (isDuplicated) {
    alert("Khách đã được chọn!");
  } else {
    alert("Vui lòng chọn một khách");
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
