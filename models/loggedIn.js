const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loggedInSchema = new Schema(
  {
    loggedIn: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("LoggedIn", loggedInSchema);
