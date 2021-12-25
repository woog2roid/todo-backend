const express = require('express');
const router = express.Router();

const controller = require('./controller');

router.post('/id', controller.isIdDuplicated);
router.post('/nickname', controller.isNicknameDuplicated);
router.post('/join', controller.join);
router.post('/login', controller.login);
router.post('/logout', controller.logout);

module.exports = router;