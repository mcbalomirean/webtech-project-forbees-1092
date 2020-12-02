module.exports = function(sequelize, DataTypes) {
    var GroupMembers = sequelize.define("group_members");
    return GroupMembers;
}