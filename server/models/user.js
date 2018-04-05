module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 6,
          msg: 'password must have six or more characters'
        }
      }
    }
  }, {})
  User.associate = function (models) {
    User.hasMany(models.Todo, { foreignKey: 'user_id' })
  }
  return User
}
