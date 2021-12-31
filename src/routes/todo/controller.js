const express = require('express');
const router = express.Router();
const Todo = require('../../database/models/todo');
const { verifyToken } = require('../../middlewares/jwtAuth');

const getTodo = async (req, res, next) => {
	verifyToken(req, res);
	console.log(req.decoded)
	const id = req.decoded.id;
	await Todo.findAll({ where: { user: id } })
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
	const { id } = req.decoded;
	const { title, detail } = req.body;
	await Todo.create({
			title,
			detail,
			isDone: false,
			user: id,
		}).then((todo) => {
			getTodo(req, res, next);
		}).catch(err => {
			next(err);
		});
};

const deleteTodo = async (req, res, next) => {
	verifyToken(req, res);
	const id = req.decoded.id;
	const { title } = req.body;
	await Todo.delete({ where: { title: title, user: id } })
		.then(() => {
			res.sendStatus(200);
		})
		.catch((err) => {
			next(err);
		});
};

const patchTodo = async () => {};

module.exports = {
	getTodo,
	addTodo,
	deleteTodo,
	patchTodo,
};