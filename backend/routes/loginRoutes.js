const express = require('express');
const router = express.Router();

const userLoginController = require('../controller/userLoginController');

router.post('/login', userLoginController.createUserLogin);
router.get('/login/user/:id', userLoginController.getSpecificUser);

module.exports = router;