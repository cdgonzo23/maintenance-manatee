// function to handle adding a new vehicle
const newVehicleFormHandler = async (event) => {
    event.preventDefault();

    const manufacturer = document.querySelector('#manufacturer').value.trim();
    const modelName = document.querySelector('#model').value.trim();
    const year = document.querySelector('#year').value.trim();
    const color = document.querySelector('#color').value.trim();
    const nickname = document.querySelector('#nickname').value.trim();
    const userId = req.session.userId;

    if (manufacturer && modelName && year && color && nickname && userId) {
        const response = await fetch ('/api/vehicle/add-vehicle', {
            method: 'POST',
            body: JSON.stringify({ manufacturer, modelName, year, color, nickname, userId }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to create new vehicle');
        }
    }
};

document
    .querySelector('#addvehicle-form')
    .addEventListener('submit', newVehicleFormHandler);