var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var security = require("./security/reqCheck");
const { writeLog, composeErrorMessage } = require("./security/loggers");
const time = require("./public/javascripts/time");
var app = express();

let errorLog = "";

// app.set('port', process.env.PORT || 8000);

//load the env vars
require("dotenv").config();
require("./config/database");

//initialize routers
var indexRouter = require("./routes/index");
var adminRouter = require("./routes/admin");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// admin request handler
app.use(
  "/admin",
  (request, response, next) => {
    let reqData = {};
    let headers = request.headers;
    reqData.method = request.method;
    reqData.url = request.url;
    reqData.body = request.body;
    reqData.contType = headers["content-type"];
    reqData.referer = headers.referer;
    reqData.address = request.socket.remoteAddress;
    reqData.userAgent = headers["user-agent"];

    // run and log urlChecker
    let reqSecurity = security.urlChecker(reqData);
    console.log(
      "|Admin check| -->",
      reqSecurity,
      " ",
      reqData.method,
      `'/admin${reqData.url}'`
    );

    // handle sus login attempt
    if (reqSecurity === "Suspicious Login") {
      time.timePromise.then((curTime) => {
        errorLog = composeErrorMessage(
          "Suspicious Login Attempt",
          curTime,
          reqData
        );
        writeLog(errorLog);
      });
      console.error(errorLog);
      response.render("admin", { incorrect: true });
    } else if (reqSecurity) {
      // login creds and URL are approved
      next();
    } else {
      // handle invalid url on admin path
      time.timePromise.then((curTime) => {
        errorLog = composeErrorMessage(
          "Invalid Admin URL",
          curTime,
          reqData
        );
        writeLog(errorLog);
      });
      return response.render("404");
    }
  },
  adminRouter
);
//root request handler
app.use(
  "/",
  (request, response, next) => {
    let reqData = {};
    let headers = request.headers;
    reqData.method = request.method;
    reqData.url = request.url;
    reqData.body = request.body;
    reqData.contType = headers["content-type"];
    reqData.referer = headers.referer;
    reqData.address = request.socket.remoteAddress;
    reqData.userAgent = headers["user-agent"];

    // run and log urlChecker
    let reqSecurity = security.urlChecker(reqData);
    console.log(
      "|Root check| -->",
      reqSecurity,
      " ",
      reqData.method,
      `'${reqData.url}'`
    );
    // handle get with body
    if (reqSecurity === "body") {
      console.error("Attempted GET req with body");
      time.timePromise.then((curTime) => {
        errorLog = composeErrorMessage(
          "GET Request with Body",
          curTime,
          reqData
        );
        writeLog(errorLog);
      });
      return response.render("404");
    } else if (reqData.method !== "GET" && reqData.url !== "/email") {
      //handle non-GET request to root
      console.error("Non GET Reqest to root");
      time.timePromise.then((curTime) => {
        errorLog = composeErrorMessage(
          "Non GET Request to root",
          curTime,
          reqData
        );
        writeLog(errorLog);
      });
      return response.render("404");
    } else if (!reqSecurity) {
      // handle invalid URL on root path
      console.error(
        "!! Invalid",
        reqData.method,
        "Request --> URL:",
        reqData.url,
        " || referer",
        reqData.referer,
        " || Address:",
        reqData.address
      );
      time.timePromise.then((curTime) => {
        errorLog = composeErrorMessage(
          "Invalid Root URL",
          curTime,
          reqData
        );
        writeLog(errorLog);
      });
      return response.render("404");
    } else {
      // root request approved
      next();
    }
  },
  indexRouter
);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.render("404");
  // next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
