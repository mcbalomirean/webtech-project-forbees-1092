// This file contains the sequelize definition for the 'notes' table.

module.exports = function(sequelize, DataTypes) {
    var Notes = sequelize.define("notes", {
        title: DataTypes.STRING,
        tags: DataTypes.STRING,
        keywords: DataTypes.STRING
        // TODO: add attachments?
    });
    return Notes;
}