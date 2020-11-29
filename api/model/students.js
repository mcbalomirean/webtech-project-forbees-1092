module.exports = function(sequelize, DataTypes) {
    var Students = sequelize.define("students", {
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        groupIds: DataTypes.INTEGER
    });
    return Students
}