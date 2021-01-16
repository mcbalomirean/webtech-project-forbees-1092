// This file contains the sequelize definition for the 'groups' table.

module.exports = function (sequelize, DataTypes) {
  var Groups = sequelize.define("groups", {
    name: DataTypes.STRING,
    owner: DataTypes.STRING,
  });
  return Groups;
};
