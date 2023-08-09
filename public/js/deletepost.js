// function to delete post by id

const deleteModal = document.getElementById("popup-modal");
const confirmModal = document.getElementById("confirm");
const cancelModal = document.getElementById("cancel");
deleteModal.setAttribute("style", "display:block;");
const deletePostHandler = async (event) => {
  event.preventDefault();

  const postId = document.querySelector(`#postId`).value;
  const vehicleId = document.querySelector(`#vehicleId`).value.trim();
  // var deleteConfirm = confirm('Are you sure you want to delete this post?');
  if (deleteConfirm === false) {
    return;
  } else {
    const response = await fetch(`/api/post/${postId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/vehicle/${vehicleId}`);
    } else {
      alert("Failed to delete post.");
    }
  }
};

document.querySelector("#delete-post-button")?.addEventListener("click", deletePostHandler);
