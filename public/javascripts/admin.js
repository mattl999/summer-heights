async function deleteDate(event) {
  event.preventDefault();
  let id = event.target.getAttribute("data-id");
  console.log(id);

  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  await fetch(`/admin/delete/${id}`, requestOptions)
    .then((res) => console.log(res.json()))
    .then(() => window.location.replace("/admin/manage-dates"));
}
