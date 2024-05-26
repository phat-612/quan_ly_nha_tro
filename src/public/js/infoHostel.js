document.querySelector(".btn-sua").addEventListener("click", function (btn) {
  $(".couplebtn").removeAttr("hidden");
  $(".btn-sua").attr("hidden", "true");
  $(".inputDis").removeAttr("disabled");
});
document.querySelector(".cancelbtn").addEventListener("click", function (btn) {
  $(".couplebtn").attr("hidden", "true");
  $(".btn-sua").removeAttr("hidden");
  $(".inputDis").attr("disabled", "true");
  document.querySelector("form").reset();
});
