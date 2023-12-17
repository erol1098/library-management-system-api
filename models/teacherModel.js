module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('teacher', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Teacher;
};
