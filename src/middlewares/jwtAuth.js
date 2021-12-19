const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' });

const verifyToken = (req, res, next) => {
	//console.log(req.cookies);
	try {
		req.decoded = jwt.verify(req.cookies.jwt_auth, process.env.JWT_KEY);
		next();
	} catch (err) {
		if (err.name === 'TokenExpiredError') {
			return res.status(401).send({
				message: "token expired",
			});
		} else {
			return res.status(401).send({
				message: "token not valid",
			});
		}
	}
};

const issueToken = (user) => {
	return token = jwt.sign({
		id: user.id,
		nickname: user.nickname,
	}, process.env.JWT_KEY, {
		expiresIn: '5m',
		issuer: 'woog2roid',
	});
};

module.exports = {
	verifyToken,
	issueToken,
};