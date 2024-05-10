$(document).ready(function () {
  var btnDelete = $(".btn-delete");
  var deleteForm = $("form[name='hopdongDelete']");
  var toBeDeleted;
  var deleteModal = $("#delete-hopdong-modal");

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
