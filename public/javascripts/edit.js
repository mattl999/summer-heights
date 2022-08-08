dateInput = document.getElementById("date-input");
timeInput = document.getElementById("time-input");
meridianInput = document.getElementById("meridian-input");
venueInput = document.getElementById("venue-input");
cityInput = document.getElementById("city-input");
provInput = document.getElementById("prov-input");
ticketInput = document.getElementById("ticket-input");

async function submitEdit(event) {
  event.preventDefault();
  let formData = {};
  let tourDateId = event.target.getAttribute("data-id");
  formData.date = dateInput.value;
  formData.id = tourDateId;
  formData.time = timeInput.value;
  formData.meridian = meridianInput.value;
  formData.venue = venueInput.value;
  formData.city = cityInput.value;
  formData.province = provInput.value;
  formData.ticketLink = ticketInput.value;
console.log(formData);

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formData: formData }),
  };
  fetch(`/admin/edit/${tourDateId}`, requestOptions)
    .then((res) => console.log(res.json()))
    .then(() => window.location.replace("/admin/manage-dates"));
}
