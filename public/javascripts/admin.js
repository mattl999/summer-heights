async function deleteDate(event) {
  event.preventDefault();
  let id = event.target.getAttribute("data-id");

  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  await fetch(`/admin/delete/${id}`, requestOptions)
    .then(() => window.location.replace("/admin/manage-dates"))     
    .catch((err)=>console.error(err));
}
