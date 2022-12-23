editForm = document.getElementById("edit-form");
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

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formData: formData }),
  };
  fetch(`/admin/edit/${tourDateId}`, requestOptions).then((res) => {
    if (res.status === 200) {
      window.location.replace("/admin/manage-dates");
    } else {
      const node = document.createElement("p");
      const messageText = document.createTextNode(
        "Something didn't work right. Hit me up and I'll take a look  -Matt"
      );
      node.appendChild(messageText);
      node.style.color = "red";
      node.style.fontWeight = "bold";
      node.style.textAlign = "center";
      node.style.marginTop = "20px";
      editForm.appendChild(node);
    }
  });
}
