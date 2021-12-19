const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../middlewares/jwtAuth');

const getTodo = async (req, res, next) => {
	verifyToken(req, res, next);
	if(req.decoded !== undefined) {
		res.send("");
	}
};

const deleteTodo = () => {
	
};

const patchTodo = () => {
	
};

module.exports = {
	getTodo,
	deleteTodo,
	patchTodo,
};