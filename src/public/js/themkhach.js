$("#frontInput").on("change", function (e) {
  var file = e.target.files[0];
  var reader = new FileReader();

  reader.onloadend = function () {
    $(".previewImage1").attr("src", reader.result);
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    $(".previewImage1").attr("src", "/img/cccd.jpg");
  }
});

$("#backInput").on("change", function (e) {
  var file = e.target.files[0];
  var reader = new FileReader();

  reader.onloadend = function () {
    $(".previewImage2").attr("src", reader.result);
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    $(".previewImage2").attr("src", "/img/cccd.jpg");
  }
});
