const express = require('express');
const router = express.Router();

const controller = require('./controller');

router.post('/checkId', controller.checkId);
router.post('/checkNickname', controller.checkNickname);
router.post('/join', controller.join);
router.post('/login', controller.login);

module.exports = router;