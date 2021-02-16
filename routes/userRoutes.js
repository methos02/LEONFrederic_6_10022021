const express = require('express');

const router = express.Router();
const login_limiter =  require('../middleware/api_limiter').login_limiter();

const userCtrl = require('../controllers/userController');

router.post('/signup', userCtrl.signup);
router.post('/login', login_limiter, userCtrl.login);

module.exports = router;
