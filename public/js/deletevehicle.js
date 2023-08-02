// function to delete vehicle by id
const deleteVehicleHandler = async (event) => {
    event.preventDefault();

    // TODO: figure out how we're pulling in id of vehicle being currently edited
    const vehicleId = document.querySelector('#').value.trim();

    var deleteConfirm = confirm('Are you sure you want to delete this vehicle?');
    if (deleteConfirm === false) {
        return;
    } else {
        const response = await fetch(`/api/vehicle/delete/${vehicleId}`, {
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