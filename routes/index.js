var express = require('express');
var router = express.Router();
const mainCtrl = require('../controllers/index')

/* GET home page. */
router.get('/', mainCtrl.index);
router.post('/email', mainCtrl.email)

module.exports = router;
