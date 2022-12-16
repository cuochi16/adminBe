const express = require('express');
const typeController = require('../controller/typeController');
const router = express.Router();

router.post('/',typeController.createType);
router.get('/:id',typeController.getTypeById);
router.get('/',typeController.getAllTypes);

module.exports = router;