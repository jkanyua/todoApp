module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
    completed_on: DataTypes.DATE,
    date_to_complete: DataTypes.DATE
  }, {})
  Todo.associate = function (models) {
    Todo.belongsTo(models.User, { foreignKey: 'id' })
  }
  return Todo
}
