const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config({ path: '../.env' });
const { sequelize } = require('./database/models');
const router = require('./routes');

const app = express();

sequelize.sync({ force: false })
	.then(() => {
		console.log('Database is working well');
	})
	.catch((err) => {
		console.error(err);
	});

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/', router);

module.exports = app;