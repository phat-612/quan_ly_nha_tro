$("#qltnModal").on("show.bs.modal", (e) => {
  const button = $(e.relatedTarget);
  const action = button.attr("data-bs-action");
  if (action === "add") {
    $("#qltnModal .modal-title").text("Thêm tiện nghi");
    $("#qltnModal button[type=submit]").text("Thêm");
    $("#qltnModal form").attr("action", "/api/themTienNghi");
  } else {
    const id = button.attr("data-bs-id");
    const name = button.attr("data-bs-name");
    $("#qltnModal input[name=name]").val(name);
    $("#qltnModal .modal-title").text("Sửa tiện nghi");
    $("#qltnModal button[type=submit]").text("Sửa");
    $("#qltnModal form").attr("action", `/api/suaTienNghi/${id}`);
  }
});
/*
Xử lý xóa
- Nếu tiện nghi đã được sử dụng thì hiển thị thông báo "Tiện nghi đã được sử dụng, nếu xóa sẽ xóa tiện nghi khỏi các phòng sử dụng tiện nghi này. Bạn có chắc chắn muốn xóa không?"
- Nếu tiện nghi không được sử dụng thì hiển thị thông báo "Bạn có chắc chắn muốn xóa không?"
*/

$(".formXoaTienNghi").on("submit", function (e) {
  e.preventDefault();
  const form = $(e.target);
  const isUsed = form.find("input[name=isUsed]").val();
  if (isUsed == "true") {
    const isDelete = confirm(
      "Tiện nghi đã được sử dụng, nếu xóa sẽ xóa tiện nghi khỏi các phòng sử dụng tiện nghi này. Bạn có chắc chắn muốn xóa không?"
    );
    if (isDelete) {
      form.off("submit");
      return form.submit();
    }
  } else {
    const isDelete = confirm("Bạn có chắc chắn muốn xóa không?");
    if (isDelete) {
      form.off("submit");
      form.submit();
    }
  }
});
