// function to handle adding a new vehicle
const newVehicleFormHandler = async (event) => {
    event.preventDefault();

    const manufacturer = document.querySelector('#manufacturer').value.trim();
    const model = document.querySelector('#model').value.trim();
    const typeOfVehicle = document.querySelector('#typeOfVehicle').value.trim();
    const year = document.querySelector('#year').value.trim();
    const color = document.querySelector('#color').value.trim();
    const nickname = document.querySelector('#nickname').value.trim();

    if (manufacturer && model && typeOfVehicle && year && color) {
        const response = await fetch ('/api/vehicle/add-vehicle', {
            method: 'POST',
            body: JSON.stringify({ manufacturer, model, typeOfVehicle, year, color, nickname }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            document.querySelector('#popup-modal').setAttribute('style', 'display:flex;');
            document.location.replace('#popup-modal');
        }
    } else {
        document.querySelector('#popup-modal').setAttribute('style', 'display:flex;');
        document.location.replace('#popup-modal');
    }
};

const hideModal = () => {
    document.querySelector('#popup-modal').setAttribute('style', 'display:none;');
}

document
    .querySelector('#addvehicle-form')
    .addEventListener('submit', newVehicleFormHandler);

document.querySelector('#okay').addEventListener('click', hideModal);