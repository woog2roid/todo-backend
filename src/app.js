const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: "../.env"}); 
const { sequelize } = require('./database/models');

const app = express();
app.use(cors);

sequelize.sync({force: false})
.then(() => console.log("Database is working well"))
.catch((err) => {console.error(err)});