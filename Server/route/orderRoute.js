const { Router } = require('express');
const express = require('express');
const orderController = require('../controller/orderController');

const router = express.Router();

router.post('/',orderController.addOrder);
router.put('/:id',orderController.updateOrder);
router.delete('/:id',orderController.deleteOrder);
router.get('/',orderController.getAll);
router.get('/:id',orderController.getById);
router.patch('/',orderController.handleorder);
router.get('/successful',orderController.totalMoney);

module.exports = router;