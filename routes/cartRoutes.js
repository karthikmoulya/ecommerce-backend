const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add', cartController.addItemToCart);
router.post('/checkout', cartController.checkoutCart);

module.exports = router;
