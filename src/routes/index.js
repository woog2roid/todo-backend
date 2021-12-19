const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const todoRouter = require('./todo');

router.use('/user', userRouter);
router.use('/todo', todoRouter);

module.exports = router;