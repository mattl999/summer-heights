const TourDate = require("../models/tour");
const sendMail = require("../utils/mail")
async function index(req, res) {
  let tourDates = await TourDate.find({});
  console.log("heythere", tourDates);
  res.render("index", { tourDates: tourDates });
}
async function email(req,res){
    let data = req.body.msgData
    console.log(data)
    let from = data.senderName;
    let email = data.emailAddress;
    let message = data.message;
    // const {from, email, message} = req.body.msgData;
    console.log(from)
    sendMail(from, email, message, function(err,data){
        if(err) {
            res.status(500).json({message: 'Internal Error'})
        } else {
            res.json({message: 'Email sent!!'})
        }
    })
    // res.json({message: 'message received!!'});
    
}

module.exports = {
  index,
  email
};
