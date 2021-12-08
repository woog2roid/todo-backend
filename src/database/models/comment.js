const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			comment: {
				type: Sequelize.STRING(500),
				allowNull: false,
			}
		}, {
			sequelize,
			timestamps: true,
			paranoid: true,
			modelName: 'Comment',
			tableName: 'comments',
			charset: 'utf8',
			collate: 'utf8_general_ci',
		}
		)
	}
	
	static associate(db) {
		db.Comment.belongsTo(db.Todo, {foreignKey: 'todo', sourcekey: 'id'});
	}
}