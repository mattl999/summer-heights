const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tourDateSchema = new Schema(
    {
        time: String,
        day: String,
        weekday: String,
        month: String,
        year: String,
        venue: String,
        city: String,
        province: String,
        ticketLink: String,
        raw: {
            date: String,
            time: String,
            meridian: String,
            venue: String,
            city: String,
            province: String,
            ticketLink: String
        }         
    },
    {
    timestamps: true,
    }
)  


module.exports = mongoose.model("TourDate", tourDateSchema);