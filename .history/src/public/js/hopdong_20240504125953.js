$(document).ready(function () {
  var guestList = [];

  // Xử lý sự kiện khi chọn phòng
  $("#chonPhong").change(function () {
    var selectedOption = $(this).children("option:selected");
    var roomPrice = selectedOption.val();
    $("#giaPhong").val(roomPrice);
  });

  // Thêm khách
  $("#addGuest").click(function () {
    var guestName = $("#form6Example1").val();
    if (guestName) {
      // Thêm tên khách vào mảng guestList
      guestList.push(guestName);

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
    var guestName = $(this).siblings("span").text();
    // Xóa tên khách khỏi mảng guestList
    guestList = guestList.filter(function (name) {
      return name !== guestName;
    });
    $(this).closest(".guest-name").remove();
  });

  // Xử lý form khi nó được gửi
  $("#themHopdong").submit(function (e) {
    e.preventDefault();

    // Tạo một object chứa dữ liệu để gửi đi
    var formData = {
      tenantId: guestList,
    };

    // Tạo một trường ẩn để chứa dữ liệu
    var formDataField = $('<input type="hidden" name="formData">');
    formDataField.val(JSON.stringify(formData));

    // Thêm trường ẩn vào biểu mẫu
    $(this).append(formDataField);

    // Gửi yêu cầu đến server
    this.submit();
  });
});
