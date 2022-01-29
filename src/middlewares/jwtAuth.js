const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' });

const verifyToken = (req, res, next) => {
	try {
		const decoded = jwt.verify(req.cookies.jwt_auth, process.env.JWT_KEY);
		req.decoded = decoded;
		return next();
	} catch(err) {
		if (err.name === 'TokenExpiredError') {
			return res.status(401).send({
				message: "token expired",
			});
		} else {
			return res.status(401).send({
				message: 'token not valid',
			});
		}
	}
};

const createToken = (user) => {
	return token = jwt.sign(
		{
			id: user.id,
			nickname: user.nickname,
		},
		process.env.JWT_KEY,
		{
			expiresIn: '30m',
			issuer: 'woog2roid',
		}
	);
};

const issueToken = (req, res, user) => {
	const token = createToken(user);
	res
		.cookie('jwt_auth', token, {
			maxAge: 30 * 60 * 1000,
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'none',
		})
		.status(200)
		.send({ user });
};

module.exports = {
	verifyToken,
	createToken,
	issueToken,
};