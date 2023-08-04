// function to handle adding a new post to a specific vehicle
const newPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector(`#new-post-title`).value.trim();
    const content = document.querySelector(`#new-post-content`).value.trim();
    const cost = document.querySelector(`#new-post-cost`).value.trim();
    const dateOfMaintenance = document.querySelector(`#date-of-maintenance`).value.trim();
    const vehicleId = document.querySelector(`#vehicleId`).value.trim();

    if (title && content && cost && dateOfMaintenance && vehicleId) {
        const response = await fetch('/api/add-post/', {
            method: 'POST',
            body: JSON.stringify({ title, content, cost, dateOfMaintenance, vehicleId }),
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
    .querySelector('#addpost-form')
    .addEventListener('submit', newPostFormHandler);