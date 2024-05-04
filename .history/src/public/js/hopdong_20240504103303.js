$(document).ready(function () {
  var guestCount = 0;

  // Thêm khách.
  $("#addGuest").click(function () {
    var guestName = $("#form6Example" + guestCount).val();
    if (guestName) {
      $("#guestList").append("<div>" + guestName + "</div>");
      guestCount++;
      $("#form6Example" + guestCount).val("");
    }
  });
});
