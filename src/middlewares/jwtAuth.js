const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' });

const verifyToken = (req, res) => {
	jwt.verify(req.cookies.jwt_auth, process.env.JWT_KEY, (err, decoded) => {
		if(err) {
			if (err.name === 'TokenExpiredError') {
				res.status(401).send({
					message: "token expired",
				});
			} else {
				res.status(401).send({
					message: 'token not valid',
				})
			}
		} else {
			req.decoded = decoded;
		}	
	});
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
	return res
		.cookie('jwt_auth', token, {
			maxAge: 30 * 60 * 1000,
			path: '/',
			httpOnly: true,
		})
		.status(200)
		.send({ user });
};

module.exports = {
	verifyToken,
	createToken,
	issueToken,
};