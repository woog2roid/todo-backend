const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const todoRouter = require('./todo');
const authRouter = require('./auth');

router.use('/user', userRouter);
router.use('/todo', todoRouter);
router.use('/auth', authRouter);

module.exports = router;