const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../database/models/user');

const checkId = async (req, res) => {
	//console.log('요청: 아이디 중복 체크');
	const id = req.body.id;
	const user = await User.findOne({where: { id }});
	if(user) {
		res.sendStatus(401);
		//console.log(`아이디 중복 체크: 중복`);
	} else {
		res.sendStatus(200);
		//console.log(`아이디 중복 체크: 유일`);
	}
};

const checkNickname = async (req, res) => {
	const nickname = req.body.nickname;
	const user = await User.findOne({where: { nickname }});
	if(user) {
		res.sendStatus(401);
	} else {
		res.sendStatus(200);
	}
};

const join = async (req, res) => {
	console.log('요청: 회원가입');
	try {
		const {id, password, nickname} = req.body;
		const hashedPassword = await bcrypt.hash(password, 12);
		await User.create({
			id,
			password: hashedPassword,
			nickname,
		});
		res.sendStatus(200);
		console.log(`회원가입: 성공: id=${id}, nickname=${nickname}`);
	} catch (err) {
		console.log(err);
	}
};

const login = async (req, res) => {
	console.log('요청: 로그인');
	const {id, password} = req.body;
	const user = await User.findOne({where: { id }});
	if (user) {
		const isMatched = await bcrypt.compare(password, user.password);
		if (isMatched) {
			res.sendStatus(200);
			console.log(`로그인: 성공: id=${id}`);
		} else {
			//비밀번호 오류
			res.status(401).send({code:"password not matched"});
				console.log(`로그인: 실패: 비밀번호 오류`);
		}
	} else {
		//아이디가 없음
		res.status(401).send({code:"id not found"});
		console.log(`로그인: 실패: 아이디 오류`);
	}
};

module.exports = {
	checkId,
	checkNickname,
	join,
	login,
};