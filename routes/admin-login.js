var express = require('express');
var router = express.Router();
const Tour = require("../models/tour");

const admin = require('../controllers/admin');

/* GET users listing. */
router.get('/', admin.getAuthPage );
router.get('/manage-dates', admin.manageDates)
router.post('/', admin.authUser);
router.post('/create', admin.create)
router.post('/logout', admin.logout)
router.get('/edit/:id', admin.getEditPage)
router.put('/edit/:id', admin.edit)
router.delete('/delete/:id', admin.deleteDate)

// router.get('/update-tour', admin.tourPortal )

// async function isLoggedIn(req, res, next) {
//   let loggedIn = await Tour.loggedIn 
//   console.log("hey there --->",loggedIn)
// }

module.exports = router;
