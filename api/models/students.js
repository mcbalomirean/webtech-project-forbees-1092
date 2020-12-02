// This file contains the sequelize definition for the 'students' table.

module.exports = function(sequelize, DataTypes) {
    var Students = sequelize.define("students", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });
    return Students;
}