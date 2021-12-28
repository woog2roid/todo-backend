const express = require('express');
const router = express.Router();
const Todo = require('../../database/models/todo');
const { verifyToken } = require('../../middlewares/jwtAuth');

const getTodo = async (req, res, next) => {
	verifyToken(req, res, next);
	const id = req.decoded.id;
	await Todo.findAll({ where: { user: id } })
		.then((todos) => {
			res.status(200).send({ todos });
		})
		.catch((err) => {
			console.log(err);
		});
};

const addTodo = async (req, res, next) => {
	verifyToken(req, res, next);
	const id = req.decoded.id;
	const { title, isDone } = req.body;
	await Todo.create({
		title,
		isDone,
		user: id,
	})
		.then(() => {
			res.sendStatus(200);
		})
		.catch((err) => {
			console.log(err);
		});
};

const deleteTodo = async (req, res, next) => {
	verifyToken(req, res, next);
	const id = req.decoded.id;
	const { title } = req.body;
	await Todo.delete({ where: { title: title, user: id } })
		.then(() => {
			res.sendStatus(200);
		})
		.catch(() => {
			console.log(err);
		});
};

const patchTodo = async () => {};

module.exports = {
	getTodo,
	addTodo,
	deleteTodo,
	patchTodo,
};