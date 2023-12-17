module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'book',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Unknown',
      },
    },
    {
      timestamps: false,
    },
  );
  return Book;
};
