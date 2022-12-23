var express = require('express');
var router = express.Router();

const admin = require('../controllers/admin');

// Auth Routes
router.get('/', admin.getAuthPage );
router.post('/', admin.authUser);
router.get('/manage-dates', admin.manageDates)
router.post('/logout', admin.logout)

// CRUD Routes
router.post('/create', admin.create)
router.get('/edit/:id', admin.getEditPage)
router.put('/edit/:id', admin.edit)
router.delete('/delete/:id', admin.deleteDate)


module.exports = router;
