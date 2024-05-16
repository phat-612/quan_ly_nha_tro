$(document).ready(function () {
  // Xử lý sự kiện khi chọn phòng
  $("#chonPhong").change(function () {
    var roomPrice = $("option:selected", this).data("price");
    $("#giaPhong").val(roomPrice);
  });

  // Thêm khách
  $("#addGuest").click(function () {
    var guestName = $("#themkhach").val();
    var guestId = $("#guestNames option")
      .filter(function () {
        return $(this).html() === guestName;
      })
      .data("id");
    // kiểm tra coi tên đã có chưa
    var isDuplicated = false;

    $(".guest-name span, .dathemkhach input[type='text']").each(function () {
      if ($(this).val() === guestName || $(this).html() === guestName) {
        isDuplicated = true;
        return false;
      }
    });

    if (isDuplicated) {
      alert("Khách đã được chọn!");
      $("#themkhach").val("");
    } else if (!guestName || !guestId) {
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
  });
  // xoa khach da them
  $(document).on("click", ".khachdango", function (e) {
    e.preventDefault();

    if ($(".dathemkhach").length <= 1) {
      alert("Phải có ít nhất một khách trong phòng!");
      return false;
    }

    $(this).closest(".dathemkhach").remove();
  });

  // Xử lý form khi nó được gửi
  $("#updatehopdong").submit(function (e) {
    var guestName = $("#themkhach").val();
    if (guestName) {
      e.preventDefault();
      alert("Chọn thêm khách");
      $("#themkhach").val("");
    }
  });
});
