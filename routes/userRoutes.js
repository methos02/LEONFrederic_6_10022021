/**
 * Routes pour Utilisateurs
 */
const express = require('express');

const router = express.Router();
const login_limiter =  require('../middleware/api_limiter').login_limiter();

const userCtrl = require('../controllers/userController');
const validateData = require('../middleware/validateData');
const userJoi = require('../schema/joi/UserJoi');

router.post('/signup', validateData(userJoi), userCtrl.signup);
router.post('/login', login_limiter, userCtrl.login);

module.exports = router;
