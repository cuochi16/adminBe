const { Router } = require('express');
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.put('/update',userController.uploadImage, userController.updateMe);
router.post('/login',userController.login);
router.get('/user',userController.getUser);
router.get('/gendered-users',userController.getGenderInterestUser);
router.get('/get-matches',userController.getAllMatches);

module.exports = router;