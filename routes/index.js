var express = require('express');
var router = express.Router();
const mainCtrl = require('../controllers/index')

router.get('/', mainCtrl.index);
router.post('/email', mainCtrl.email)

module.exports = router;
