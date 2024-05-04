$(document).ready(function () {
  const inpXemroomNumber = document.querySelector(".inpXemroomNumber");
  const inpXemfloor = document.querySelector(".inpXemfloor");
  const inpXemarea = document.querySelector(".inpXemarea");
  const inpXemprice = document.querySelector(".inpXemprice");
  const inpXemdescription = document.querySelector(".inpXemdescription");
  const inpXemcapacity = document.querySelector(".inpXemcapacity");
  const updateBtninModal = document.querySelector(".updateBtninModal");
  const cancelBtninModal = document.querySelector(".cancelBtninModal");
  const saveBtninModal = document.querySelector(".saveBtninModal");
  const inpXemisEmpty = document.querySelector(".inpXemisEmpty");

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
    const idAmeniti_length = button.attr("data-bs-idAmeniti_length");

    const idAmenitiesArr = [];
    const idAmeniti = {};
    for (let i = 0; i < idAmeniti_length; i++) {
      const key = "idAmeniti" + i;
      const value = button.attr("data-bs-idAmenities" + i);

      idAmeniti[key] = value;

      console.log(idAmeniti[key]);
    }

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

    updateBtninModal.addEventListener("click", () => {
      document.querySelector(".titleXCT").textContent = "Sửa Chi Tiết";
      inpXemroomNumber.removeAttribute("disabled");
      inpXemfloor.removeAttribute("disabled");
      inpXemarea.removeAttribute("disabled");
      inpXemprice.removeAttribute("disabled");
      inpXemdescription.removeAttribute("disabled");
      inpXemcapacity.removeAttribute("disabled");
      $(".checkboxAmeniti").prop("disabled", false);

      updateBtninModal.setAttribute("hidden", "true");
      cancelBtninModal.removeAttribute("hidden");
      saveBtninModal.removeAttribute("hidden");

      cancelBtninModal.addEventListener("click", () => {
        updateBtninModal.removeAttribute("hidden");
        cancelBtninModal.setAttribute("hidden", "true");
        saveBtninModal.setAttribute("hidden", "true");
        document.querySelector(".titleXCT").textContent = "Xem Chi Tiết";
        inpXemroomNumber.setAttribute("disabled", "true");
        inpXemfloor.setAttribute("disabled", "true");
        inpXemarea.setAttribute("disabled", "true");
        inpXemprice.setAttribute("disabled", "true");
        inpXemdescription.setAttribute("disabled", "true");
        inpXemcapacity.setAttribute("disabled", "true");
        $(".checkboxAmeniti").prop("disabled", true);
      });
    });
  });
});
