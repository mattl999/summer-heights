var express = require('express');
var router = express.Router();
const mainCtrl = require('../controllers/index')

/* GET home page. */
router.get('/', mainCtrl.index);
// router.post('/email', mainCtrl.email)
router.post('/email', mainCtrl.email2)

module.exports = router;
