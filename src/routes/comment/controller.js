const express = require('express');
const router = express.Router();
const Comment = require('../../database/models/comment');
const { verifyToken } = require('../../middlewares/jwtAuth');

const getComments = async (req, res, next) => {
	verifyToken(req, res);
	const user = req.decoded.id;
	const todo = req.query.todo;
	await Comment.findAll({ where: { todo, user } })
		.then((comments) => {
			res.send({ comments });
		})
		.catch((err) => {
			next(err);
		});
};

const addComment = async (req, res, next) => {
	verifyToken(req, res);
	const user = req.decoded.id;
	const { comment, todo } = req.body;
	await Comment.create({
			user,
			comment,
			todo,
		}).then(() => {
			res.sendStatus(200);
		}).catch(err => {
			next(err);
		});
};

const deleteComment = async (req, res, next) => {
	verifyToken(req, res);
	const user = req.decoded.id;
	const { id } = req.params;
	await Comment.destroy({ where: { id, user } })
		.then(() => {
			res.sendStatus(200);
		})
		.catch((err) => {
			next(err);
		});
};

module.exports = {
	getComments,
	addComment,
	deleteComment,
};