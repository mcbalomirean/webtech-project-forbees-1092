// This file contains the sequelize definition for the 'notes' table.

module.exports = function(sequelize, DataTypes) {
    var notes = sequelize.define("notes", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        // studentId: DataTypes.INTEGER, <-- this will be handled outside
        title: DataTypes.STRING,
        // subject: DataTypes.STRING, <-- as will this
        dateCreated: { 
            type: DataTypes.DATE,
            allowNull: false
        },
        dateModified: { 
            type: DataTypes.DATE,
            allowNull: false
        },
        tags: DataTypes.STRING,
        keywords: DataTypes.STRING
        // TODO: add attachments?
    });
    return notes;
}