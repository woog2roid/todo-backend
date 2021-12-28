const Sequelize = require('sequelize');

module.exports = class Todo extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				title: {
					type: Sequelize.STRING(50),
					allowNull: false,
				},
				isDone: {
					type: Sequelize.BOOLEAN,
					allowNull: false,
				},
			},
			{
				sequelize,
				timestamps: true,
				paranoid: true,
				modelName: 'Todo',
				tableName: 'todos',
				charset: 'utf8',
				collate: 'utf8_general_ci',
			}
		);
	}

	static associate(db) {
		db.Todo.belongsTo(db.User, {foreignKey: 'user', sourcekey:'id'});
		db.Todo.hasMany(db.Comment, {foreignKey: 'todo', sourcekey:'id'});
	}
};