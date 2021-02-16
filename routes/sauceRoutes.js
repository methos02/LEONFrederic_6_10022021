const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauceController');
const multer = require('../middleware/multer_config');
const auth = require('../middleware/auth');
const validateData = require('../middleware/validateData');
const sauceJoi = require('../models/Sauce').sauceJoi;

router.get('/', auth,sauceCtrl.index);
router.post('/', auth, multer, validateData(sauceJoi, 'sauce'),  sauceCtrl.store);
router.get('/:id', auth, sauceCtrl.show);
router.put('/:id', auth, multer, validateData(sauceJoi,'sauce'), sauceCtrl.update);
router.delete('/:id', auth, sauceCtrl.delete);
router.post('/:id/like', auth, sauceCtrl.like);

module.exports = router;
