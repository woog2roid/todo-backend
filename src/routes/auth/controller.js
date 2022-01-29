const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../database/models/user');
const { issueToken, destroyToken } = require('../../middlewares/jwtAuth');

const isIdDuplicated = async (req, res, next) => {
	try {
		const id = req.body.id;
		const user = await User.findOne({where: { id }});
		if(user) {
			res.sendStatus(401);
		} else {
			res.sendStatus(200);
		}
	} catch(err) {
		next(err);
	}
};

const isNicknameDuplicated = async (req, res, next) => {
	try {
		const nickname = req.body.nickname;
		const user = await User.findOne({where: { nickname }});
		if(user) {
			res.sendStatus(401);
		} else {
			res.sendStatus(200);
		}
	} catch(err) {
		next(err);
	}
};

const join = async (req, res, next) => {
	try {
		console.log('[요청: 회원가입]');
		const {id, password, nickname} = req.body;
		const hashedPassword = await bcrypt.hash(password, 12);
		const user = await User.create({
			id,
			password: hashedPassword,
			nickname,
		});
		issueToken(req, res, user);
		console.log(`회원가입: 성공: id=${id}, nickname=${nickname}`);
	} catch(err) {
		next(err);
	}
};

const login = async (req, res, next) => {
	try {		
		console.log('[요청: 로그인]');
		const {id, password} = req.body;
		const user = await User.findOne({where: { id: id }});
		if (user) {
			const isMatched = await bcrypt.compare(password, user.password);
			if (isMatched) {
				issueToken(req, res, user);
				console.log(`로그인: 성공: id=${id}`);
			} else {
				//비밀번호 오류
				res.status(401).send({message: "password not matched"});
				console.log(`로그인: 실패: 비밀번호 오류`);
			}
		} else {
			//아이디가 없음
			res.status(401).send({message: "id not found"});
			console.log(`로그인: 실패: 아이디 오류`);
		}
	} catch (err) {
		next(err);
	}
};

const logout = async (req, res, next) => {
	try {
		console.log('[요청: 로그아웃]');
		destroyToken(req, res);
	} catch(err) {
		next(err);
	}
};

module.exports = {
	isIdDuplicated,
	isNicknameDuplicated,
	join,
	login,
	logout,
};