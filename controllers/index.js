const TourDate = require("../models/tour");
// const sendMail = require("../utils/mail");
const sendGrid = require("../utils/mail");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function index(req, res) {
  let tourDates = await TourDate.find({});
  console.log("heythere", tourDates);
  res.render("index", { tourDates: tourDates });
}

async function email2(req, res) {
  
  let data = req.body.msgData;
  let from = data.name;
  let email = data.email;
  let message = data.message;
  console.log("confirming this is the email 2 function")
  const msg = {
    // to: 'summerheights.contact@gmail.com', 
    // to: "summerheights.contact@gmail.com", 
    to: "mattl99@hotmail.ca",
    from: "summerheightswebsite@gmail.com",
    subject: "Message from Summer Heights Website",
    text: message,
    html: `Message from: <strong> ${from} </strong> <br>
    Email Address: <strong style="color:blue">${email}</strong> 
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
      return error;
    });
}
// async function email(req, res) {
//   let data = req.body.msgData;
//   console.log('controller', data);
//   let from = data.senderName;
//   let email = data.emailAddress;
//   let message = data.message;
//   // const {from, email, message} = req.body.msgData;
//   sendMail(from, email, message, function (err, data) {
//     if (err) {
//       res.status(500).json({ message: "Internal Error" });
//     } else {
//       res.json({ message: "Email sent!!" });
//     }
//   });
//   // res.json({message: 'message received!!'});
// }

//sendgrid attempt
async function email(req, res) {
  console.log(req.body);
  let data = req.body;

  // let data = req.body.msgData;
  // console.log('controller', data);
  let from = data.name;
  let email = data.emailaddress;
  let message = data.message;
  console.log(from);
  // const {from, email, message} = req.body.msgData;
  let response = sendGrid(from, email, message);
  // res.json({message: 'message received!!'});
  console.log("epic response:", response);
}

module.exports = {
  index,
  email,
  email2,
};
