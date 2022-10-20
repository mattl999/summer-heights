
// const nodemailer = require("nodemailer")

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const sendGrid = (from, email, message) => {
const msg = {
  // to: 'summerheights.contact@gmail.com', // Change to your recipient
  to: 'mattl99@hotmail.ca', // Change to your recipient
  from: 'summerheightswebsite@gmail.com', // Change to your verified sender
  subject: 'Message from Summer Heights Website',
  text: message,
  html: `Sender's address: <strong style="color:blue">${email}</strong> </br> </br>
  <strong> Their message was: </strong> "${message}" </br> </br> 
  Reply to this message using the address provided by the sender (colored in <span style="color:blue"> blue</span>).`,
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent');
    // res.json("Email sent. Thanks for reaching out!")
    return 'Email sent'
  })
  .catch((error) => {
    console.error(error)
    return error
  })
}

// const mg = mailgun({
//   apiKey: '527f6e5f42fe320d16e09a9123ae2076-2bab6b06-2d2bed81',
//   domain: "sandbox0bdffd31f2124d2fa0122ab6f9f4714b.mailgun.org",
// });
// const sendMail = (from, email, text, cb) => {
//   // const data = {
//   //   from: `${from} <${email}>`,
//   //   to: "mattlobo25@gmail.com",
//   //   subject: "Message from Summer Heights Website!",
//   //   text: text,
//   // };
//   const data = {
//     from: `${from} <${email}>`,
//     to: "cgaac@outlook.com",
//     subject: "Message from Summer Heights Website!",
//     text: text,
//   };
//   console.log("mail.js", data)
//   mg.messages().send(data, function (err, data) {
//     if (err){
//       console.log('error');
      
//         cb(err, null);
//     } else {
//       console.log('it worked')
//       console.log(data)
      
//         cb(null,data)
//     }
    
//   });
// };



module.exports = sendGrid; 