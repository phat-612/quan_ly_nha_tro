$("#chonPhong").change(function () {
  var roomPrice = $("option:selected", this).data("price");
  $("#giaPhong").val(roomPrice);
});
