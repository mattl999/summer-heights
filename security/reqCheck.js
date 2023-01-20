// const { request } = require("../app");

//GET REQUESTS
const validUrls = [
  "/",
  "/admin",
  "/logout",
  "edit",
  "/create",
  "delete",
  "/manage-dates",
  "/admin/manage-dates",
  "/admin/edit",
  "/edit",
  "/email",
  "/delete",
  "/favicon.ico",
  "/img/icons/favicon.png",
  "/img/backgrounds/contact-bg.jpg",
  "/img/backgrounds/main-bg.jpg",
  "/img/backgrounds/main-bg-top.jpg",
  "/img/backgrounds/input-bg.jpg",
  "/img/hero.jpg",
  "/img/icons/hamburger.svg",
  "/img/icons/insta-icon.svg",
  "/img/icons/spotify-icon.svg",
  "/img/icons/tiktok-icon.svg",
  "/img/icons/yt-icon.svg",
  "/img/merch/hat-hoodie-bundle-min.jpg",
  "/img/merch/t-shirt-hoodie-combo-min.jpg",
  "/img/merch/tote-tee-bundle2-min.jpg",
  "/img/merch/transparent-embroidered-dad-hat3-min.png",
  "/img/merch/transparent-rat-hoodie2-min.png",
  "/img/merch/transparent-robot-tshirt-min.png",
  "/img/merch/transparent-tote-bag3-min.png",
  "/img/merch/ultimate-bundle-min.jpg",
  "/javascripts/admin.js",
  "/javascripts/edit.js",
  "/javascripts/script.js",
  "/stylesheets/admin.css",
  "/stylesheets/contact.css",
  "/stylesheets/manage-dates.css",
  "/stylesheets/music.css",
  "/stylesheets/shop.css",
  "/stylesheets/style.css",
  "/stylesheets/tour.css",
  "/admin/logout",
  "/admin/create",
];

const urlChecker = (data) => {
let url = data.url;
let body = data.body;
let method =  data.method;

  let xcpt1 = "/edit/";
  let xcpt2 = "/create/";
  let xcpt3 = "/delete/";


  if (url.includes(xcpt1) || url.includes(xcpt2) || url.includes(xcpt3)) {
    url = url.split("/");
    url = url[1];
  }

  if (!validUrls.includes(url)) {
    return false;
  }
  if (method === "GET" && Object.keys(body).length) {
    return "body"
  }
  if (method === "POST") {
    let user = body.user;
    let pass = body.pass;
    if (user || pass) {
      const format = /[\[\]{}&;'"\\|<>\/]+/;
      let securityString = user + pass;
      if (user.length > 4 || pass.length > 10 || format.test(securityString)) {
        return "Suspicious Login";
      } else {
        return true;
      }
    } else {
      return true;
    }
  } else {
    return true
  }
};

module.exports = {
  urlChecker,
};
