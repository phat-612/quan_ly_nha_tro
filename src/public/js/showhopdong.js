$(document).ready(function () {
  var btnDelete = $(".btn-delete");
  var deleteForm = $("form[name='hopdongDelete']");
  var deleteModal = $("#delete-hopdong-modal");
  var toBeDeleted;

  btnDelete.on("click", function (event) {
    toBeDeleted = $(this).data("id");

    // Hiện modal xác nhận
    deleteModal.modal("show");
  });

  // Xác nhận xóa trong modal
  $("#btn-delete").on("click", function () {
    deleteForm.attr("action", "/api/xoahopdong/" + toBeDeleted);
    deleteForm.submit();
    deleteModal.modal("hide");
  });
  // Hủy xóa
  deleteModal.find(".btn-delete").on("click", function () {
    deleteModal.modal("hide");
  });
});

// //////////////////////////////////////////////
$(".btn-view").click(function () {
  var images = $(this).data("image").split(",");
  $(".modal-body").empty();
  if (images[0] !== "") {
    images.forEach(function (image) {
      $(".modal-body").append(
        `<img src="/uploads/${image}" alt="" style="width: 100%; height: auto;" />`
      );
    });
  } else {
    $(".modal-body").append("<p>Không có hình</p>");
  }
});
