// $(document).ready(function () {
//   const inpXemroomNumber = document.querySelector(".inpXemroomNumber");
//   const inpXemfloor = document.querySelector(".inpXemfloor");
//   const inpXemarea = document.querySelector(".inpXemarea");
//   const inpXemprice = document.querySelector(".inpXemprice");
//   const inpXemdescription = document.querySelector(".inpXemdescription");
//   const updateBtninModal = document.querySelector(".updateBtninModal");
//   const cancelBtninModal = document.querySelector(".cancelBtninModal");
//   const saveBtninModal = document.querySelector(".saveBtninModal");
//   const inpXemisEmpty = document.querySelector(".inpXemisEmpty");
//   const hiddenInpId = document.querySelector(".hiddenInpId");
//   const updateRoomBtninModal = document.querySelector(".updateRoomBtninModal");
//   const inpQuantity = document.querySelector(".quantity");

//   $(".btnXemRoom").click((e) => {
//     const button = $(e.currentTarget);
//     const id = button.attr("data-bs-id");
//     const isEmpty = button.attr("data-bs-isEmpty");
//     const roomNumber = button.attr("data-bs-roomNumber");
//     const floor = button.attr("data-bs-floor");
//     const price = button.attr("data-bs-price");
//     const area = button.attr("data-bs-area");
//     const description = button.attr("data-bs-description");
//     const idAmenities = button.attr("data-bs-idAmenities").split(",");
//     const defaultidAmenitiesArr = [];

//     $(".checkboxAmeniti").each(function () {
//       const checkboxAmenitis = $(this).val();
//       defaultidAmenitiesArr.push(checkboxAmenitis);
//     });
//     const checkAmenities = defaultidAmenitiesArr.filter((e) =>
//       idAmenities.includes(e)
//     );

//     defaultidAmenitiesArr.forEach((e) => {
//       $(`#modalXem #${e}`).prop("checked", false);
//     });
//     checkAmenities.forEach((e) => {
//       $(`#modalXem #${e}`).prop("checked", true);
//     });

//     hiddenInpId.value = id;
//     inpXemroomNumber.value = roomNumber;
//     inpXemfloor.value = floor;
//     inpXemarea.value = area;
//     inpXemprice.value = price;
//     inpXemdescription.value = description;

//     if (isEmpty == "true") {
//       inpXemisEmpty.textContent = "Phòng Trống";
//     } else {
//       inpXemisEmpty.textContent = "Đã Thuê";
//     }

//     updateBtninModal.addEventListener("click", () => {
//       document.querySelector(".titleXCT").textContent = "Sửa Chi Tiết";

//       inpQuantity.removeAttribute("disabled");
//       inpXemroomNumber.removeAttribute("disabled");
//       inpXemfloor.removeAttribute("disabled");
//       inpXemarea.removeAttribute("disabled");
//       inpXemprice.removeAttribute("disabled");
//       inpXemdescription.removeAttribute("disabled");
//       $(".checkboxAmeniti").prop("disabled", false);

//       updateBtninModal.setAttribute("hidden", "true");
//       cancelBtninModal.removeAttribute("hidden");
//       saveBtninModal.removeAttribute("hidden");

//       cancelBtninModal.addEventListener("click", () => {
//         updateBtninModal.removeAttribute("hidden");
//         cancelBtninModal.setAttribute("hidden", "true");
//         saveBtninModal.setAttribute("hidden", "true");
//         document.querySelector(".titleXCT").textContent = "Xem Chi Tiết";
//         inpXemroomNumber.setAttribute("disabled", "true");
//         inpXemfloor.setAttribute("disabled", "true");
//         inpXemarea.setAttribute("disabled", "true");
//         inpXemprice.setAttribute("disabled", "true");
//         inpXemdescription.setAttribute("disabled", "true");
//         inpQuantity.setAttribute("disabled", "true");

//         $(".checkboxAmeniti").prop("disabled", true);
//       });
//     });
//   });

//   $(".updateRoomBtn").click((e) => {
//     const button = $(e.currentTarget);
//     const id = button.attr("data-bs-id");
//     const isEmpty = button.attr("data-bs-isEmpty");
//     const roomNumber = button.attr("data-bs-roomNumber");
//     const floor = button.attr("data-bs-floor");
//     const price = button.attr("data-bs-price");
//     const area = button.attr("data-bs-area");
//     const description = button.attr("data-bs-description");

//     const idAmenities = button.attr("data-bs-idAmenities").split(",");
//     const defaultidAmenitiesArr = [];
//     $(".checkboxAmeniti").each(function () {
//       const checkboxAmenitis = $(this).val();
//       defaultidAmenitiesArr.push(checkboxAmenitis);
//     });
//     const checkAmenities = defaultidAmenitiesArr.filter((e) =>
//       idAmenities.includes(e)
//     );

//     defaultidAmenitiesArr.forEach((e) => {
//       $(`#modalXem #${e}`).prop("checked", false);
//     });
//     checkAmenities.forEach((e) => {
//       $(`#modalXem #${e}`).prop("checked", true);
//     });

//     hiddenInpId.value = id;
//     inpXemroomNumber.value = roomNumber;
//     inpXemfloor.value = floor;
//     inpXemarea.value = area;
//     inpXemprice.value = price;
//     inpXemdescription.value = description;

//     if (isEmpty == "true") {
//       inpXemisEmpty.textContent = "Phòng Trống";
//     } else {
//       inpXemisEmpty.textContent = "Đã Thuê";
//     }

//     inpXemroomNumber.removeAttribute("disabled");
//     inpXemfloor.removeAttribute("disabled");
//     inpXemarea.removeAttribute("disabled");
//     inpQuantity.removeAttribute("disabled");
//     inpXemprice.removeAttribute("disabled");
//     inpXemdescription.removeAttribute("disabled");
//     $(".checkboxAmeniti").prop("disabled", false);
//     updateBtninModal.setAttribute("hidden", "true");
//     updateRoomBtninModal.removeAttribute("hidden");
//   });
// });
// =====================================================================================================

$(document).ready(function () {
  const inpXemroomNumber = document.querySelector(".inpXemroomNumber");
  const inpXemfloor = document.querySelector(".inpXemfloor");
  const inpXemarea = document.querySelector(".inpXemarea");
  const inpXemprice = document.querySelector(".inpXemprice");
  const inpXemdescription = document.querySelector(".inpXemdescription");
  const updateBtninModal = document.querySelector(".updateBtninModal");
  const cancelBtninModal = document.querySelector(".cancelBtninModal");
  const saveBtninModal = document.querySelector(".saveBtninModal");
  const inpXemisEmpty = document.querySelector(".inpXemisEmpty");
  const hiddenInpId = document.querySelector(".hiddenInpId");
  const updateRoomBtninModal = document.querySelector(".updateRoomBtninModal");
  const quantityinput = document.querySelector(".quantity");

  $(".btnXemRoom").click((e) => {
    const button = $(e.currentTarget);
    const id = button.attr("data-bs-id");
    const isEmpty = button.attr("data-bs-isEmpty");
    const roomNumber = button.attr("data-bs-roomNumber");
    const floor = button.attr("data-bs-floor");
    const price = button.attr("data-bs-price");
    const area = button.attr("data-bs-area");
    const description = button.attr("data-bs-description");
    const quantityarr = button.attr("data-bs-quantity");

    const quantity = quantityarr.trim().split(" ");
    console.log(quantity);
    const inpQuantity = [];
    $(".quantity").each(function () {
      inpQuantity.push(this.id);
    });
    console.log(inpQuantity);

    $(quantity).each(function (index, val) {
      if (inpQuantity[index]) {
        $("#" + inpQuantity[index]).val(val);
      }
    });

    hiddenInpId.value = id;
    inpXemroomNumber.value = roomNumber;
    inpXemfloor.value = floor;
    inpXemarea.value = area;
    inpXemprice.value = price;
    inpXemdescription.value = description;

    inpXemisEmpty.textContent = isEmpty == "true" ? "Phòng Trống" : "Đã Thuê";

    updateBtninModal.removeAttribute("hidden");
    cancelBtninModal.setAttribute("hidden", "true");
    saveBtninModal.setAttribute("hidden", "true");
    document.querySelector(".titleXCT").textContent = "Xem Chi Tiết";
    inpXemroomNumber.setAttribute("disabled", "true");
    inpXemfloor.setAttribute("disabled", "true");
    inpXemarea.setAttribute("disabled", "true");
    inpXemprice.setAttribute("disabled", "true");
    $(".quantity").attr("disabled", "true");
    inpXemdescription.setAttribute("disabled", "true");
    $(".checkboxAmeniti").prop("disabled", true);
    updateBtninModal.addEventListener("click", () => {
      document.querySelector(".titleXCT").textContent = "Sửa Chi Tiết";
      inpXemroomNumber.removeAttribute("disabled");
      inpXemfloor.removeAttribute("disabled");
      inpXemarea.removeAttribute("disabled");
      inpXemprice.removeAttribute("disabled");
      $(".quantity").removeAttr("disabled");
      inpXemdescription.removeAttribute("disabled");
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
        $(".quantity").attr("disabled", "true");
        inpXemdescription.setAttribute("disabled", "true");
        $(".checkboxAmeniti").prop("disabled", true);
      });
    });
  });

  $(".updateRoomBtn").click((e) => {
    const button = $(e.currentTarget);
    const id = button.attr("data-bs-id");
    const isEmpty = button.attr("data-bs-isEmpty");
    const roomNumber = button.attr("data-bs-roomNumber");
    const floor = button.attr("data-bs-floor");
    const price = button.attr("data-bs-price");
    const area = button.attr("data-bs-area");
    const description = button.attr("data-bs-description");

    hiddenInpId.value = id;
    inpXemroomNumber.value = roomNumber;
    inpXemfloor.value = floor;
    inpXemarea.value = area;
    inpXemprice.value = price;
    inpXemdescription.value = description;

    inpXemisEmpty.textContent = isEmpty == "true" ? "Phòng Trống" : "Đã Thuê";

    inpXemroomNumber.removeAttribute("disabled");
    inpXemfloor.removeAttribute("disabled");
    inpXemarea.removeAttribute("disabled");
    inpXemprice.removeAttribute("disabled");
    inpXemdescription.removeAttribute("disabled");
    $(".checkboxAmeniti").prop("disabled", false);
    updateBtninModal.setAttribute("hidden", "true");
    updateRoomBtninModal.removeAttribute("hidden");
  });
});
