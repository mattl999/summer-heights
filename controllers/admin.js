const TourDate = require("../models/tour");
const LoggedIn = require("../models/loggedIn");
var ntm = require("number-to-date-month-name");
var dayOfWeek = require("day-of-week").get;
var weekday = require("weekday");

function sanitizeInput(input) {
  return input
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
}

async function create(req, res) {
  let currentlyLoggedIn = await LoggedIn.find({});
  let loggedInState = currentlyLoggedIn[0].loggedIn;
  console.log("Tour Date Added. raw data:", req.body);
  if (!loggedInState) {
    res.redirect("/");
  }
  let n = req.body;
  for (let key in n) {
    n[key] = sanitizeInput(n[key]);
  }
  let t = {};
  t.raw = n;
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
  let currentlyLoggedIn = await LoggedIn.find({});
  let loggedInState = currentlyLoggedIn[0].loggedIn;
  if (!loggedInState) {
    res.redirect("/");
  }
  let id = req.params.id;
  let date = await TourDate.findById(id);

  await TourDate.deleteOne({ _id: id })
    .then(() => {
      console.log("Tour Date Deleted: ", date);
      return res.status(200).end();
    })
    .catch((err) => {
      console.error("Delete Tour Date Error:", err);
      return res.status(500).end();
    });
}
async function authUser(req, res) {
  let user = req.body.user;
  let pass = req.body.pass;
  let currentlyLoggedIn = await LoggedIn.find({});
  let loggedInState = currentlyLoggedIn[0].loggedIn;
  if (
    (user === process.env.USERNAME && pass === process.env.PASS) ||
    (user === process.env.USERNAME2 && pass === process.env.PASS2)
  ) {
    await login();
    res.redirect("/admin/manage-dates");
  } else {
    console.error(`Incorrect Login: "${user}" "${pass}"`);
    res.render("admin", { incorrect: true });
  }
}
async function getAuthPage(req, res) {
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
  let selectedDate = await TourDate.findById(id);
  res.render("edit", { el: selectedDate });
}

async function edit(req, res) {
  let errorType = "";
  let currentlyLoggedIn = await LoggedIn.find({});
  let loggedInState = currentlyLoggedIn[0].loggedIn;
  if (!loggedInState) {
    res.redirect("/");
  } else {
    let n = req.body.formData;
    for (let key in n) {
      n[key] = sanitizeInput(n[key]);
    }
    let id = n.id;
    await TourDate.findById(id)
      .then((t) => {
        // console.log("just testing ", t);
        t.raw = n;
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
        
        // console.log("just testing ", t);
        t.save()
          .then(() => {
            console.log("Edit Tour Date Success: ", t);
            return res.status(200).end();
          })
          .catch((err) => {
            errorType = "Error Saving Tour Date";
            console.error(errorType, err);
            return res.status(500).end();
          });
      })
      .catch((err) => {
        errorType = "Error finding TourDate";
        console.error(errorType, err);
        return res.status(500).end();
      });
  }
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
