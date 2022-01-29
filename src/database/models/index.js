const Sequelize = require('sequelize');
require('dotenv').config({ path: '../../../.env' });
const env = process.env.NODE_ENV || 'development';
const config = require('../config.json')[env];

const User = require('./user');
const Todo = require('./todo');
const Comment = require('./comment');

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.User = User;
db.Todo = Todo;
db.Comment = Comment;

User.init(sequelize);
Todo.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Todo.associate(db);
Comment.associate(db);

module.exports = db;
