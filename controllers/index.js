const TourDate = require("../models/tour");

async function index(req,res){

    let tourDates = await TourDate.find({},)
    console.log("heythere",tourDates)

    res.render('index', { tourDates: tourDates });
} 

module.exports = {
    index
}