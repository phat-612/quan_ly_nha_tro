$(document).ready(function () {
  // Xử lý sự kiện khi chọn phòng
  $("#chonPhong").change(function () {
    var roomPrice = $("option:selected", this).data("price");
    $("#giaPhong").val(roomPrice);
  });
  // ngày bắt đàu
  var currentDate = new Date().toISOString().split("T")[0];
  $("#startDate").attr("min", currentDate);
  // ngày kêt thúc
  $("#endDate").on("change", function () {
    var startDateValue = $("#startDate").val();
    var endDateValue = $(this).val();
    if (startDateValue && endDateValue < startDateValue) {
      $(this).val(startDateValue);
    }
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
      checkRequired();
    }
  });

  // Xóa khách
  $(document).on("click", ".removeGuest", function (e) {
    e.preventDefault();
    $(this).closest(".guest-name").remove();
    checkRequired(); // Kiểm tra lại thuộc tính 'required' khi xóa khách
  });

  // $("#themkhach").on("input", checkRequired);
  // kiểm tra xem guestNames đã có hay chưa
  function checkRequired() {
    if ($("#guestList .guest-name").length === 0) {
      $("#themkhach").attr("required", true);
    } else {
      $("#themkhach").removeAttr("required");
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
