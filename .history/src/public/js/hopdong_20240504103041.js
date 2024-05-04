$(document).ready(function () {
  var guestCount = 0;

  // Thêm khách.
  $("#addGuest").click(function () {
    guestCount++;

    var guestHTML = `
  <div class="form-outline" id="guest${guestCount}">
    <label class="form-label" for="form6Example${guestCount}">Tên khách thuê</label>
    <input list="guestNames${guestCount}" id="form6Example${guestCount}" class="form-control" />
    <datalist id="guestNames${guestCount}">
      <option value="Nguyễn Văn A${guestCount}">
      <option value="Trần Thị B${guestCount}">
      <option value="Lê Văn C${guestCount}">
    </datalist>
    <button type="button" class="removeGuest" data-guestid="${guestCount}">Xóa</button>
  </div>`;

    // Thêm mã guestHTML vào danh sách khách.
    $("#guestList").append(guestHTML);
  });

  // Xóa khách.
  $(document).on("click", ".removeGuest", function () {
    var guestId = $(this).data("guestid");
    $("#guest" + guestId).remove();
  });
});
