// This file contains the sequelize definition for the 'students' table.

module.exports = function (sequelize, DataTypes) {
  var Students = sequelize.define("students", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  return Students;
};
