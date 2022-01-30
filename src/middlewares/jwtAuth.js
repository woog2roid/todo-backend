const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' });

const verifyToken = (req, res, next) => {
	try {
		const decoded = jwt.verify(req.cookies.jwt_auth, process.env.JWT_KEY);
		req.decoded = decoded;
		return next();
	} catch (err) {
		if (err.name === 'TokenExpiredError') {
			return res.status(401).send({
				message: 'token expired',
			});
		} else {
			return res.status(401).send({
				message: 'token not valid',
			});
		}
	}
};

const createToken = (user) => {
	try {
		return (token = jwt.sign(
			{
				id: user.id,
				nickname: user.nickname,
			},
			process.env.JWT_KEY,
			{
				expiresIn: '30m',
				issuer: 'woog2roid',
			}
		));
	} catch (err) {
		console.log(err);
	}
};

const issueToken = (req, res, user) => {
	try {
		const token = createToken(user);
		res.cookie('jwt_auth', token, {
			maxAge: 30 * 60 * 1000,
			httpOnly: true,
			path: '/',
			secure: true,
			sameSite: 'none',
			domain: '.woog2roid.dev',
		})
			.status(200)
			.send({ user });
	} catch (err) {
		console.log(err);
	}
};

const destroyToken = (req, res) => {
	try {
		res.clearCookie('jwt_auth', {
			path: '/',
			secure: true,
			sameSite: 'none',
			domain: '.woog2roid.dev',
		}).end();
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	verifyToken,
	createToken,
	issueToken,
	destroyToken,
};