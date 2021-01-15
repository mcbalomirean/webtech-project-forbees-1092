module.exports = function (sequelize, DataTypes) {
  var Groups = sequelize.define("groups", {
    name: DataTypes.STRING,
    owner: DataTypes.STRING,
  });
  return Groups;
};
