// function to delete post by id
const displayModal = async (event) => {
    const deleteModal = document.getElementById("popup-modal");
    deleteModal.setAttribute("style", "display:flex;");
    document.location.replace('#popup-modal');
};

const hideModal = () => {
    const deleteModal = document.getElementById("popup-modal");
    deleteModal.setAttribute("style", "display:none;");
};

const deletePostHandler = async (event) => {
  event.preventDefault();
    hideModal();
  const postId = document.querySelector(`#postId`).value;
  const vehicleId = document.querySelector(`#vehicleId`).value.trim();


    const response = await fetch(`/api/post/${postId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/vehicle/${vehicleId}`);
    } else {
      alert("Failed to delete post.");
    }
};

document.querySelector("#delete-post-button")?.addEventListener("click", displayModal);
document.getElementById("confirm").addEventListener("click", deletePostHandler);
document.getElementById("cancel").addEventListener("click", hideModal);