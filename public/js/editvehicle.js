// function to handle editing a vehicle
const editVehicleFormHandler = async (event) => {
  event.preventDefault();

  const manufacturer = document.querySelector("#manufacturer").value.trim();
  const model = document.querySelector("#model").value.trim();
  const typeOfVehicle = document.querySelector("#typeOfVehicle").value.trim();
  const year = document.querySelector("#year").value.trim();
  const color = document.querySelector("#color").value.trim();
  const nickname = document.querySelector("#nickname").value.trim();
  const vehicleId = document.querySelector("#edit-vehicle-form").getAttribute("data-vehicle-id");
  console.log(manufacturer, model, color, nickname, year, vehicleId);

  if (manufacturer && model && typeOfVehicle && year && color && vehicleId) {
    const response = await fetch(`/api/vehicle/${vehicleId}`, {
      method: "PUT",
      body: JSON.stringify({ manufacturer, model, typeOfVehicle, year, color, nickname }),
      headers: { "Content-Type": "application/json" },
    });

    if (response) {
      const updatedVehicle = await response.json();
      console.log("Updated Vehicle: ", updatedVehicle);
      document.location.replace("/homepage");
    } else {
      alert("failed to edit vehicle");
    }
  }
};
document.querySelector("#update-vehicle-button").addEventListener("click", editVehicleFormHandler);
