// function to delete vehicle by id
const displayModal = (event) => {
    const deleteModal = document.getElementById("popup-modal");
    deleteModal.setAttribute("style", "display:flex;");
    document.location.replace('#popup-modal');
}; 

const hideModal = () => {
    const deleteModal = document.getElementById("popup-modal");
    deleteModal.setAttribute("style", "display:none;");
}; 

const deleteVehicleHandler = async (event) => {
    event.preventDefault();

    const vehicleId = document.querySelector('#delete-vehicle-btn').value.trim();

    const response = await fetch(`/api/vehicle/${vehicleId}`, {
        method: 'DELETE',
        body: JSON.stringify({ vehicleId }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('failed to delete vehicle.');
    }
};

document
    .querySelector('#delete-vehicle-btn')
    .addEventListener('click', displayModal);

    document.getElementById("confirm").addEventListener("click", deleteVehicleHandler);
    document.getElementById("cancel").addEventListener("click", hideModal);