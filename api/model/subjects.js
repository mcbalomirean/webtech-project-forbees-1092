module.exports = function(sequelize, DataTypes)
{
    var Subjects = sequelize.define("subjects",
    {
        name: 
        {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true //works as primary key
        },
        year: DataTypes.INTEGER,
        semester: DataTypes.INTEGER
    });
    return Subjects
}