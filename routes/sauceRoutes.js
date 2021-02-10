const express = require('express');

const router = express.Router();


const sauceCtrl = require('../controllers/sauceController');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.get('/', auth,sauceCtrl.index);
router.post('/', auth, multer, sauceCtrl.store);
router.get('/:id', auth, sauceCtrl.show);
router.put('/:id', auth, multer, sauceCtrl.update);
router.delete('/:id', auth, sauceCtrl.delete);
router.post('/:id/like', auth, sauceCtrl.like);

module.exports = router;
