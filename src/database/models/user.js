const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			id: {
				type: Sequelize.STRING(30),
				allowNull: false,
				primaryKey: true,
			},	
			password: {
				type: Sequelize.STRING(300),
				allowNull: false,
			},
			nickname: {
				type: Sequelize.STRING(30),
				allowNull: false,
				unique: true,
			}
		}, {
			sequelize,
			timestamps: true,
			paranoid: true,
			modelName: 'User',
			tableName: 'users',
			charset: 'utf8',
			collate: 'utf8_general_ci',
		}
		)
	}
	
	static associate(db) {
		db.User.hasMany(db.Todo, {foreignKey: 'user', sourcekey: 'id'});
	}
}