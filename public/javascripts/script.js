const navToggler = document.querySelector(".menu-button");
const senderName = document.getElementById("contact-name");
const emailAddress = document.getElementById("contact-email-address");
const message = document.getElementById("contact-message");

let togglerBorder = false;

const toggle = () => {
  togglerBorder = !togglerBorder;
  togglerBorder
    ? (navToggler.style.filter =
        "invert(100%) sepia(0%) saturate(1752%) hue-rotate(344deg)    brightness(99%) contrast(115%)")
    : (navToggler.style.filter =
        "invert(82%) sepia(0%) saturate(1752%) hue-rotate(320deg)    brightness(99%) contrast(115%)");
};
const submitEmail = (event) => {
  event.preventDefault();
  const data = {};
  data.senderName = senderName.value;
  data.emailAddress = emailAddress.value;
  data.message = message.value;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ msgData: data }),
  };
  console.log("Frontend", data);
  fetch("/email", requestOptions);
};
const sendEmail = (event) => {
  // event.preventDefault();
  const data = {};
  data.senderName = senderName.value;
  data.emailAddress = emailAddress.value;
  data.message = message.value;
  console.log(data);

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "summerheights@elasticemail.com",
    Password: "T9zWM9BLTB@nhV",
    To: "mattl99@hotmail.ca",
    From: data.emailAddress,
    Subject: "This is the subject",
    Body: "And this is the body",
  }).then((message) => alert(message));
};
navToggler.addEventListener("click", toggle);
// smtpjs12345
// summerheights123


// summerheights@elasticemail.com
// T9zWM9BLTB@nhV