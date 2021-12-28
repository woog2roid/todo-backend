const express = require('express');
const router = express.Router();
const User = require('../../database/models/user');
const { verifyToken } = require('../../middlewares/jwtAuth');

const getUser = async (req, res, next) => {
	verifyToken(req, res, next);
	await User.findOne({ where: { id: req.decoded.id } })
		.then((user) => {
			res.status(200).send({ user });
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = {
	getUser,
};