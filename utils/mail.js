const mailgun = require("mailgun-js");

const mg = mailgun({
  apiKey: "527f6e5f42fe320d16e09a9123ae2076-2bab6b06-2d2bed81",
  domain: "sandbox0bdffd31f2124d2fa0122ab6f9f4714b.mailgun.org",
});
// const transporter = nodemailer.createTransport(mailGun(auth));
const sendMail = (from, email, text, cb) => {
  const data = {
    from: `${from} <${email}>`,
    to: "mattl99@hotmail.ca",
    subject: "Message from Summer Heights Website!",
    text: text,
  };
  mg.messages().send(data, function (err, data) {
    if (err){
        cb(err, null);
    } else {
        cb(null,data)
    }
    
  });
};

module.exports = sendMail; 