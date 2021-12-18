const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' });

const verifyToken = async (req, res, next) => {
	try {
		req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_KEY);
		console.log(req.decoded);
		return next();
	} catch (err) {
		if (err.name === 'TokenExpiredError') {
			return res.status(401).send({
				message: "token expired",
			})
		} else {
			return res.status(401).send({
				message: "token not valid",
			})
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