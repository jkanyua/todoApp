module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {})
  User.associate = function (models) {
    User.hasMany(models.Todo, { foreignKey: 'user_id' })
  }
  return User
}
