const { Router } = require('express');
const express = require('express');
const supportController = require('../controller/supportController');

const router = express.Router();

router.post('/',supportController.createSupport);
router.delete('/:id',supportController.deleteSupport);
// router.get('/:email',supportController.search);
router.get('/',supportController.getAll);
router.get('/:id',supportController.getById);
module.exports = router;