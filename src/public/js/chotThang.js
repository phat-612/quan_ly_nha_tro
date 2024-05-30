$("#chotThangModal").on("show.bs.modal", (e) => {
  var button = $(e.relatedTarget);
  $("#formChotThang").trigger("reset");
  const idDetailContract = button.attr("data-bs-idDetailContract");
  const idContract = button.attr("data-bs-idContract");
  const oldElectric = button.attr("data-bs-oldElectric");
  const oldWater = button.attr("data-bs-oldWater");
  const isEnd = button.attr("data-bs-isEnd");
  $("#chotThangModal input[name=idDetailContract]").val(idDetailContract);
  $("#chotThangModal input[name=idContract]").val(idContract);
  $("#chotThangModal input[name=oldElectric]").val(oldElectric);
  $("#chotThangModal input[name=oldWater]").val(oldWater);
  $("#chotThangModal input[name=isEnd]").val(isEnd);
});

$("#formChotThang").on("submit", (e) => {
  let oldElectric = parseInt(
    $("#chotThangModal input[name=oldElectric]").val()
  );
  let oldWater = parseInt($("#chotThangModal input[name=oldWater]").val());
  let newElectric = parseInt(
    $("#chotThangModal input[name=newElectric]").val()
  );
  let newWater = parseInt($("#chotThangModal input[name=newWater]").val());

  if (newElectric < oldElectric || newWater < oldWater) {
    $("#chotThangModal .error-message").addClass("d-block");
    $("#chotThangModal .error-message").removeClass("d-none");
    e.preventDefault();
  } else {
    $("#chotThangModal .error-message").removeClass("d-block");
    $("#chotThangModal .error-message").addClass("d-none");
  }
});
