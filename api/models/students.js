// This file contains the sequelize definition for the 'students' table.

module.exports = function(sequelize, DataTypes) {
    var students = sequelize.define("students", {
        //PK
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
        // groupIds: DataTypes.INTEGER
    });
    return students;
}