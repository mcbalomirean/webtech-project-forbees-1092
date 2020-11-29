module.exports = function(sequelize, DataTypes) {
    var Groups = sequelize.define("groups", {
        //primary key
        groupId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },

        name: DataTypes.STRING,
        studentIds: DataTypes.INTEGER
        //?? supposed to connect M:M
    });
    return Groups
}