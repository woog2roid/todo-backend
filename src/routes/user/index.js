const express = require('express');
const router = express.Router();

const controller = require('./controller');
const { verifyToken } = require('../../middlewares/jwtAuth');

router.use('/', (req, res, next) => verifyToken(req, res, next));
router.get('/', controller.getUser);

module.exports = router;