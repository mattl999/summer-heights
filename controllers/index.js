const TourDate = require("../models/tour");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function index(req, res) {
  let tourDates = await TourDate.find({});
  res.render("index", { tourDates: tourDates });
}

async function email(req, res) {
  let data = req.body.msgData;
  let from = data.name;
  let email = data.email;
  let message = data.message;
  const format = /[\[\]{}&;'"\\|<>\/]+/;
  let securityString = from + email + message;
  if (!format.test(securityString)) {
    const msg = {
      to: "mattl99@hotmail.ca",
      from: "summerheightswebsite@gmail.com",
      subject: "Message from Summer Heights Website",
      text: message,
      html: `From: <strong> ${from} </strong> <br>
    E-mail Address: <strong style="color:blue">${email}</strong> 
    <br><br>  
    <span style="font-size:large;"><strong > Message: </strong> "${message}" </span>
    <br><br> 
    Reply to this message using the address shown in <span style="color:blue"> blue</span>.`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
        res.json("Email sent. Thanks for reaching out!");
        return "Email sent";
      })
      .catch((error) => {
        console.error(error);
        res.status(400);
        res.json("Error");
        return error;
      });
  } else {
    res.status(400);
    res.json("Error");
    return error;
  }
}

module.exports = {
  index,
  email,
};
