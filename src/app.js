const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: '../.env' });
const { sequelize } = require('./database/models');
const router = require('./routes');

const app = express();

sequelize
	.sync({ force: false })
	.then(() => {
		console.log('Database is working well');
	})
	.catch((err) => {
		console.error(err);
	});

app.use(express.json());
app.use(cookieParser());

app.use(
	cors({
		origin: ['https://woog2roid.github.io', 'https://service.woog2roid.dev', 'https://todo.woog2roid.dev'],
		credentials: true,
	})
);

app.use(morgan('dev'));

app.use('/', router);

app.use((err, req, res, next) => {
	console.log('[서버 내부 오류 발생], 오류 내용 이하.');
	console.log(err);
	return res.sendStatus(500);
});

module.exports = app;
