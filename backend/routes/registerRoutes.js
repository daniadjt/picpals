const express = require('express');
const router = express.Router();
const userRegisterController = require('../controller/userRegisterController');

router.post('/register', userRegisterController.createUserRegister);

module.exports = router;