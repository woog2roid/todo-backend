const express = require('express');
const router = express.Router();
const User = require('../../database/models/user');
const { verifyToken } = require('../../middlewares/jwtAuth');

const getUser = async (req, res, next) => {
	await verifyToken(req, res);
	console.log('[요청: 유저인증]user ID: ' + req.decoded.id);
	await User.findOne({ where: { id: req.decoded.id } })
		.then((user) => {
			res.status(200).send({ user });
		})
		.catch((err) => {
			next(err);
		});
};

module.exports = {
	getUser,
};