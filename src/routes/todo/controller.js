const express = require('express');
const router = express.Router();
const Todo = require('../../database/models/todo');

const getTodo = async (req, res, next) => {
	try {
		const user = req.decoded.id;	
		const todoId = req.params.id;
		const todo = await Todo.findOne({ where: { id:todoId, user } });
		res.send({ todo });	
	} catch(err) {
		next(err);
	}
};

const getTodos = async (req, res, next) => {
	try {
		const user = req.decoded.id;
		const todos = await Todo.findAll({ where: { user } });
		res.send({ todos });
	} catch(err) {
		next(err);
	}
};

const addTodo = async (req, res, next) => {
	try {
		const user = req.decoded.id;
		const { title, detail } = req.body;
		await Todo.create({
				title,
				detail,
				isDone: false,
				user,
			});
		res.sendStatus(200);	
	} catch(err) {
		next(err);
	}
};

const deleteTodo = async (req, res, next) => {
	try {
		const user = req.decoded.id;
		const { id } = req.params;
		await Todo.destroy({ where: { id, user } });
		res.sendStatus(200);
	} catch(err) {
		next(err);
	}
};

const patchTodo = async (req, res, next) => {
	try {
		const user = req.decoded.id;
		const { id, title, detail, isDone } = req.body;
		await Todo.update({
				isDone, title, detail
			}, {
				where: {id, user}
			});
		res.sendStatus(200);
	} catch(err) {
		next(err);
	}
};

module.exports = {
	getTodos,
	getTodo,
	addTodo,
	deleteTodo,
	patchTodo,
};