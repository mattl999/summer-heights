const TourDate = require("../models/tour");
const LoggedIn = require("../models/loggedIn");

var ntm = require("number-to-date-month-name");

var dayOfWeek = require("day-of-week").get;
var weekday = require("weekday");

async function create(req, res) {
  console.log("create func triggered");
  console.log(req.body);
  let n = req.body;
  let t = {};
  t.raw = n;
  console.log(dayOfWeek(n.date));
  let weekD = weekday(dayOfWeek(n.date) + 1).substring(0, 3);
  let fullTime = n.time + n.meridian;
  let dateArr = n.date.split("-");
  let year = dateArr[0];
  let month = ntm.toMonth(dateArr[1]).substring(0, 3).concat(".");
  let day = dateArr[2];
  t.venue = n.venue;
  t.time = fullTime;
  t.weekday = weekD;
  t.day = day;
  t.month = month;
  t.year = year;
  t.city = n.city;
  t.province = n.province;
  t.ticketLink = n.ticketLink;
  let newObj = new TourDate(t);
  await newObj.save();
  res.redirect("/admin/manage-dates");
}
async function deleteDate(req, res) {
  console.log("Hey");
  let id = req.params.id;
  console.log(id);
  await TourDate.deleteOne({ _id: id })
  return res.status(200).json({ formData: "hi there" });

}

async function authUser(req, res) {
  console.log("authuser func triggered");
  console.log("hello -->", process.env.USERNAME);
  let user = req.body.user;
  let pass = req.body.pass;
  let currentlyLoggedIn = await LoggedIn.find({});
  let loggedInState = currentlyLoggedIn[0].loggedIn;

  console.log(req.body);

  if (
    (user === process.env.USERNAME && pass === process.env.PASS) ||
    (user === process.env.USERNAME2 && pass === process.env.PASS2)
  ) {
    await login();
    res.redirect("/admin/manage-dates");
  } else {
    res.render("admin", { incorrect: true });
  }
}
async function getAuthPage(req, res) {
  console.log("getauthpagefunctriggered");
  let currentlyLoggedIn = await LoggedIn.find({});
  let loginState = currentlyLoggedIn[0].loggedIn;
  loginState
    ? res.redirect("/admin/manage-dates")
    : res.render("admin", { incorrect: false });
}
async function manageDates(req, res) {
  let currentlyLoggedIn = await LoggedIn.find({});
  let loginState = currentlyLoggedIn[0].loggedIn;
  if (loginState) {
    let tourDates = await TourDate.find({});
    res.render("manage-dates", { tourDates: tourDates });
  } else {
    res.redirect("/");
  }
}
async function logout(req, res) {
  let currentlyLoggedIn = await LoggedIn.findOne({});
  currentlyLoggedIn.loggedIn = false;
  currentlyLoggedIn.save(function (err) {
    if (err) return console.log(err);
    return res.redirect("/admin");
  });
}
async function login() {
  let currentlyLoggedIn = await LoggedIn.findOne({});
  currentlyLoggedIn.loggedIn = true;
  currentlyLoggedIn.save();
}
async function getEditPage(req, res) {
  id = req.params.id;
  // console.log("edit controller function triggered", id);
  let selectedDate = await TourDate.findById(id);
  // console.log(selectedDate);
  res.render("edit", { el: selectedDate });
}

async function edit(req, res) {
  console.log("edit func hit: ", req.body.formData);
  let n = req.body.formData;
  let id = n.id;
  console.log("edit func hit: ", id);
  let t = await TourDate.findById(id);
  t.raw = n;
  console.log(dayOfWeek(n.date));
  let weekD = weekday(dayOfWeek(n.date) + 1).substring(0, 3);
  let fullTime = n.time + n.meridian;
  let dateArr = n.date.split("-");
  let year = dateArr[0];
  let month = ntm.toMonth(dateArr[1]).substring(0, 3).concat(".");
  let day = dateArr[2];
  t.venue = n.venue;
  t.time = fullTime;
  t.weekday = weekD;
  t.day = day;
  t.month = month;
  t.year = year;
  t.city = n.city;
  t.province = n.province;
  t.ticketLink = n.ticketLink;
  t.save();
  return res.status(200).json({ formData: "hi there" });
}

module.exports = {
  getAuthPage,
  create,
  authUser,
  manageDates,
  logout,
  getEditPage,
  edit,
  deleteDate,

  //   tourPortal,
};
