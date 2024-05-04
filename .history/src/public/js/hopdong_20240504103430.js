$(document).ready(function () {
  // Thêm khách.
  $("#addGuest").click(function () {
    var guestName = $("#form6Example1").val();
    if (guestName) {
      $("#guestList").append("<div>" + guestName + "</div>");
      $("#form6Example1").val("");
    }
  });
});
