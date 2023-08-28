
const express = require('express');

const router = express.Router();
const login_handle = require('../router_handler/login')
const expressJoi = require('@escook/express-joi');
const { login_rules } = require('../schema/login');


router.post('/register',expressJoi(login_rules),login_handle.registerHandle)
router.post('/login',expressJoi(login_rules),login_handle.loginHandle)
router.get('/getUsers',login_handle.getUsers)

module.exports = router;