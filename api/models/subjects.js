module.exports = function(sequelize, DataTypes) {
    var Subjects = sequelize.define("subjects",
    {
        name: 
        {
            type: DataTypes.STRING,
            primaryKey: true //works as primary key
        },
        year: DataTypes.INTEGER,
        semester: DataTypes.INTEGER
    });
    return Subjects;
}