import {
    getAllCategories,
    deleteCategoryByID,
    postCategory,
    
  } from "./httprequests.js";
  let list = document.querySelector(".categories");
  getAllCategories().then((data) => {
    data.forEach((category) => {
      list.innerHTML += `<li data-desc="${category.description}" class="list-group-item d-flex  justify-content-between">
        <span>${category.name}</span>
        <div>
        <button class="btn btn-danger" data-id="${category.id}">Delete</button>
        </div>
        </li>`;
    });})
    //delete button click event
    Array.from(list.children).forEach((item) => {
      let deleteButton = item.children[1].children[1];
      let categoryName = item.children[0].textContent;
      deleteButton.addEventListener("click", (e) => {
        //sweet alert
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
          },
          buttonsStyling: false,
        });
  
        swalWithBootstrapButtons
          .fire({
            title: `Are you sure to delete ${categoryName}?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Your file has been deleted.",
                "success"
              );
              let id = e.target.getAttribute("data-id");
              deleteCategoryByID(id);
              //delete from UI
              e.target.parentElement.parentElement.remove();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              swalWithBootstrapButtons.fire(
                "Cancelled",
                "Your imaginary file is safe :)",
                "error"
              );
            }
          });
      });
    })
    let openModal = document.querySelector(".open-modal");
  let closeModal = document.querySelector(".close-modal");
  let modal = document.querySelector("#add-category-modal");
  
  openModal.addEventListener("click", () => {
    document.body.classList.add("modal-body");
    modal.style.opacity = "1";
    modal.style.visibility = "visible";
    modal.style.transform = "translate(-50%,-50%) scale(1)";
  });
  
  closeModal.onclick = function () {
    ModalClose();
  };
  function ModalClose() {
    document.body.classList.remove("modal-body");
    modal.style.opacity = "0";
    modal.style.visibility = "hidden";
    modal.style.transform = "translate(-50%,-50%) scale(0)";
  }
  let nameInput = document.querySelector("#name");
  let descInput = document.querySelector("#desc");
  let form = document.querySelector("form");
  
  form.addEventListener("submit",async(e) => {
    e.preventDefault();
    const category = {
      name: nameInput.value,
      description: descInput.value,
    };
    //reset inputs
    nameInput.value = "";
    descInput.value = "";
    let id;
    await postCategory(category).then((data)=>{
       id = data.id;
    })
  
    // add product to UI
    list.innerHTML += `<li data-desc="${category.description}" class="list-group-item d-flex  justify-content-between">
    <span>${category.name}</span>
    <div>
    <button class="btn btn-danger" data-id="${id}">Delete</button>
    </div>
    </li>`;
  
    //close modal
    ModalClose();
  });
