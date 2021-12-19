const express = require('express');
const router = express.Router();

const authController = require('./authController');
const infoController = require('./infoController');

router.post('/checkId', authController.checkId);
router.post('/checkNickname', authController.checkNickname);
router.post('/join', authController.join);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('*', infoController.getUser)

module.exports = router;