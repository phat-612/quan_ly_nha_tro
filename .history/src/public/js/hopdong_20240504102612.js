$(document).ready(function () {
  var guestCount = 0;

  $("#addGuest").click(function () {
    guestCount++;

    var guestHTML = `
  <div class="form-outline">
    <label class="form-label" for="form6Example${guestCount}">Tên khách thuê</label>
    <input list="guestNames${guestCount}" id="form6Example${guestCount}" class="form-control" />
    <datalist id="guestNames${guestCount}">
      <option value="Nguyễn Văn A${guestCount}">
      <option value="Trần Thị B${guestCount}">
      <option value="Lê Văn C${guestCount}">
    </datalist>
  </div>`;

    // Thêm mã guestHTML vào form.
    $("#guestList").append(guestHTML);
  });
});
