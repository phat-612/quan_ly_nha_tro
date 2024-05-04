$(document).ready(function () {
  const inpXemroomNumber = document.querySelector(".inpXemroomNumber");
  const inpXemfloor = document.querySelector(".inpXemfloor");
  const inpXemarea = document.querySelector(".inpXemarea");
  const inpXemprice = document.querySelector(".inpXemprice");
  const inpXemdescription = document.querySelector(".inpXemdescription");
  const inpXemisEmpty = document.querySelector(".inpXemisEmpty");
  const inpXemcapacity = document.querySelector(".inpXemcapacity");
  const updateBtn = document.querySelector(".updateBtn");

  $(".btnXemRoom").click((e) => {
    const button = $(e.currentTarget);
    const id = button.attr("data-bs-id");
    const isEmpty = button.attr("data-bs-isEmpty");
    const roomNumber = button.attr("data-bs-roomNumber");
    const floor = button.attr("data-bs-floor");
    const price = button.attr("data-bs-price");
    const area = button.attr("data-bs-area");
    const capacity = button.attr("data-bs-capacity");
    const description = button.attr("data-bs-description");
    const idAmenities = [];
    inpXemroomNumber.value = roomNumber;
    inpXemfloor.value = floor;
    inpXemarea.value = area;
    inpXemcapacity.value = capacity;
    inpXemprice.value = price;
    inpXemdescription.value = description;
    if (isEmpty) {
      inpXemisEmpty.textContent = "Phòng Trống";
    } else {
      inpXemisEmpty.textContent = "Đã Thuê";
    }

    updateBtn.addEventListener("click", () => {
      document.querySelectorAll(".titleXCT").textContent = "Sửa Chi Tiết";
    });
  });
});
