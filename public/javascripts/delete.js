const adminForm = document.getElementById("adminForm");

async function deleteDate(event) {
  event.preventDefault();
  let id = event.target.getAttribute("data-id");

  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  await fetch(`/admin/delete/${id}`, requestOptions).then((res) => {
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
      adminForm.appendChild(node);
    }
  });
}
