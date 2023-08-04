// function to delete vehicle by id
const deleteVehicleHandler = async (event) => {
    event.preventDefault();

    const vehicleId = document.querySelector('#').value.trim();

    var deleteConfirm = confirm('Are you sure you want to delete this vehicle?');
    if (deleteConfirm === false) {
        return;
    } else {
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
    }
};

document
    .querySelector('#deletevehicle-form')
    .addEventListener('submit', deleteVehicleHandler);