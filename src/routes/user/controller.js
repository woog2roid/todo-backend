const express = require('express');
const router = express.Router();
const User = require('../../database/models/user');

const getUser = async (req, res, next) => {
	try {
		console.log('[요청: 유저인증]user ID: ' + req.decoded.id);
		const user = await User.findOne({ where: { id: req.decoded.id } });
		res.status(200).send({ user });
	} catch(err) {
		next(err);
	}
};

module.exports = {
	getUser,
};