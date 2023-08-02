// function to handle editing a vehicle

const editVehicleFormHandler = async (event) => {
    event.preventDefault();

    const manufacturer = document.querySelector('#manufacturer').value.trim();
    const modelName = document.querySelector('#model').value.trim();
    const year = document.querySelector('#year').value.trim();
    const color = document.querySelector('#color').value.trim();
    const nickname = document.querySelector('#nickname').value.trim();
    // TODO: figure out how we're pulling in vehicleId for a given vehicle
    const vehicleId = document.querySelector('#vehicleId').value.trim();

    if (manufacturer && modelName && year && color && nickname && vehicleId) {
        const response = await fetch(`/api/vehicle/${vehicleId}`, {
            method: 'PUT',
            body: JSON.stringify({ manufacturer, modelName, year, color, nickname }),
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('failed to edit vehicle');
        }
    }
};

document
    .querySelector('#editvehicle-form')
    .addEventListener('submit', editVehicleFormHandler);