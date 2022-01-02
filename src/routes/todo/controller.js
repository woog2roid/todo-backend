const express = require('express');
const router = express.Router();
const Todo = require('../../database/models/todo');
const { verifyToken } = require('../../middlewares/jwtAuth');

const getTodo = async (req, res, next) => {
	verifyToken(req, res);
	const user = req.decoded.id;
	await Todo.findAll({ where: { user } })
		.then((todos) => {
			res.send({ todos });
		})
		.catch((err) => {
			next(err);
		});
};

//addTodo하면 성공시에 업데이트된 todo-list를 다시 보내주는 거로.
const addTodo = async (req, res, next) => {
	verifyToken(req, res);
	const user = req.decoded.id;
	const { title, detail } = req.body;
	await Todo.create({
			title,
			detail,
			isDone: false,
			user,
		}).then(() => {
			res.sendStatus(200);
		}).catch(err => {
			next(err);
		});
};

const deleteTodo = async (req, res, next) => {
	verifyToken(req, res);
	const user = req.decoded.id;
	const { id } = req.params;
	await Todo.destroy({ where: { id, user } })
		.then(() => {
			res.sendStatus(200);
		})
		.catch((err) => {
			next(err);
		});
};

const patchTodo = async (req, res, next) => {
	verifyToken(req, res);
	const user = req.decoded.id;
	const { id, title, detail, isDone } = req.body;
	await Todo.update({
			isDone, title, detail
		}, {
			where: {id, user}
		})
		.then(() => {
			res.sendStatus(200);
		})
		.catch((err) => {
			next(err);
		});
};

module.exports = {
	getTodo,
	addTodo,
	deleteTodo,
	patchTodo,
};