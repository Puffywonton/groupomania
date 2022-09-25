
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const billCtrol = require('../controllers/bill');

router.post('/', auth, multer, billCtrol.createBill );
router.get('/', auth, billCtrol.getAllBill);
router.get('/:id', auth, billCtrol.getOneBill);
router.put('/:id', auth, multer, billCtrol.modifyBill);
router.delete('/:id', auth, billCtrol.deleteBill);
router.post('/:id/like', auth, billCtrol.likeBill);

module.exports = router;