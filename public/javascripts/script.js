const navToggler = document.querySelector(".menu-button");
const senderName = document.getElementById("contact-name");
const emailAddress = document.getElementById("contact-email-address");
const message = document.getElementById("contact-message");
const contactSection = document.getElementById("contact-section-container");
const imgObj = document.getElementById("tester");

let togglerBorder = false;

// imgObj.addEventListener('load', ()=>{alert("loaded")})

const toggle = () => {
  togglerBorder = !togglerBorder;
  togglerBorder
    ? (navToggler.style.filter =
        "invert(100%) sepia(0%) saturate(1752%) hue-rotate(344deg)    brightness(99%) contrast(115%)")
    : (navToggler.style.filter =
        "invert(82%) sepia(0%) saturate(1752%) hue-rotate(320deg)    brightness(99%) contrast(115%)");
};

let emailError = false;

const sendEmail = async (event) => {
  event.preventDefault();
  let form = event.target;
  const data = {};
  data.name = form.elements[0].value;
  data.email = form.elements[1].value;
  data.message = form.elements[2].value;

  const format = /[\[\]{}&;'"\\|<>\/]+/;
  let securityString = data.name + data.email + data.message;
  if (!format.test(securityString)) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ msgData: data }),
    };
    fetch("/email", requestOptions).then((res) => {
      if (res.status === 200) {
        if (contactSection.children.length > 2) {
          contactSection.removeChild(contactSection.children[2]);
        }
        const node = document.createElement("p");
        const messageText = document.createTextNode(
          "Your Message Was Sent. Thanks for reaching out!"
        );
        node.appendChild(messageText);
        node.style.color = "white";
        node.style.textAlign = "center";
        contactSection.appendChild(node);
        senderName.value = "";
        emailAddress.value = "";
        message.value = "";
        setTimeout(function () {
          node.classList.add("fade");
          setTimeout(function () {
            contactSection.removeChild(node);
          }, 3000);
        }, 4000);
      } else {
        if (contactSection.children.length > 2) {
          contactSection.removeChild(contactSection.children[2]);
        }
        const node = document.createElement("p");
        const messageText = document.createTextNode(
          "There was an error sending your message. You can mail us directly at: summerheights.contact@gmail.com"
        );
        node.appendChild(messageText);
        node.style.color = "red";
        node.style.textAlign = "center";
        contactSection.appendChild(node);
        senderName.value = "";
        emailAddress.value = "";
        message.value = "";
      }
    });
  } else {
    if (contactSection.children.length > 2) {
      contactSection.removeChild(contactSection.children[2]);
    }
    const node = document.createElement("p");
    const messageText = document.createTextNode(
      "There was an error sending your message: Invalid characters were used. Please refrain from using quotation marks, semi-colons or other special characters "
    );
    node.appendChild(messageText);
    node.style.color = "red";
    node.style.textAlign = "center";
    contactSection.appendChild(node);
  }
};

navToggler.addEventListener("click", toggle);


// smtpjs12345
// summerheights123

// summerheights@elasticemail.com
// T9zWM9BLTB@nhV
