const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config({ path: '../.env' });
const { sequelize } = require('./database/models');
const router = require('./routes');
const { verifyToken } = require('./middlewares/auth');

const app = express();

sequelize.sync({ force: false })
	.then(() => {
		console.log('Database is working well');
	})
	.catch((err) => {
		console.error(err);
	});

app.use(express.json());
app.use(cors({
	origin: ["https://todo-frontend-vepxk.run.goorm.io",
			 "https://woog2roid.github.io"],
	credentials: true,
}));
app.use(morgan('dev'));

app.use('/', router);

module.exports = app;