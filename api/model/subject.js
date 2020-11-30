module.exports = function(sequalize, DataTypes)
{
    var SubjectTable = sequalize.define("subject_table",
    {
        subjectName: 
        {
            type: DataTypes.STRING,
            allowNull:  false,
            unique: true //works as primary key
        } ,
        year: DataTypes.INTEGER,
        semester: DataTypes.INTEGER
    });
    return SubjectTable
}