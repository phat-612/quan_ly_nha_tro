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
      $("#themkhach").val("");
    } else if (isDuplicated) {
      alert("Khách đã được chọn!");
      $("#themkhach").val("");
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

  $("#themkhach").on("input", checkRequired);
  // kiểm tra xem guestNames đã có hay chưa
  function checkRequired() {
    var val = $("#themkhach").val();
    var opts = $("#guestNames").children();
    for (var i = 0; i < opts.length; i++) {
      if (opts[i].value === val) {
        $("#themkhach").removeAttr("required");
        break;
      } else {
        $("#themkhach").attr("required", true);
      }
    }
  }
  // Xử lý form khi nó được gửi
  $("#themHopdong").submit(function (e) {
    var guestName = $("#themkhach").val();
    if (guestName) {
      e.preventDefault();
      alert("Chọn thêm khách");
      $("#themkhach").val("");
    }
  });
});
