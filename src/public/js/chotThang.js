$("#chotThangModal").on("show.bs.modal", (e) => {
  var button = $(e.relatedTarget);
  const idDetailContract = button.attr("data-bs-idDetailContract");
  const idContract = button.attr("data-bs-idContract");
  const oldElectric = button.attr("data-bs-oldElectric");
  const oldWater = button.attr("data-bs-oldWater");
  $("#chotThangModal input[name=idDetailContract]").val(idDetailContract);
  $("#chotThangModal input[name=idContract]").val(idContract);
  $("#chotThangModal input[name=oldElectric]").val(oldElectric);
  $("#chotThangModal input[name=oldWater]").val(oldWater);
});
