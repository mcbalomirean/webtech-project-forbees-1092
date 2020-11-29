module.exports = function(sequelize, DataTypes) {
    var groups = sequelize.define("groups", {
        //primary key
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        name: DataTypes.STRING,
        //studentIds: DataTypes.INTEGER
        //?? supposed to connect M:M
    });
    return Groups
}