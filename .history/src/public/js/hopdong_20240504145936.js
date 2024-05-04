$(document).ready(function () {
  // Xử lý sự kiện khi chọn phòng
  $("#chonPhong").change(function () {
    var roomPrice = $("option:selected", this).data("price");
    $("#giaPhong").val(roomPrice);
  });

  // Thêm khách
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
        '</span><input type="hidden" name="tenantId" value="' +
        guestId +
        '"></div>';

      $("#guestList").append(guestHTML);
      $("#form6Example1").val("");
    } else if (isDuplicated) {
      alert("Guest is already selected!");
    } else {
      alert("Please select a guest");
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
