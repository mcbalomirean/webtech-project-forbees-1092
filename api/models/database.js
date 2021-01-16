const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const basename = path.basename(module.filename);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
  }
);

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.log("Unable to connect to the database: ", error);
  });

db.sequelize = sequelize; // we only need this sequelize instance
// db.Sequelize = Sequelize;

db.Students = require("./students")(sequelize, Sequelize);
db.Subjects = require("./subjects")(sequelize, Sequelize);
db.Notes = require("./notes")(sequelize, Sequelize);
db.Groups = require("./groups")(sequelize, Sequelize);

db.Students.belongsToMany(db.Groups, { through: "group_members" }); //<--- a student belongs to many groups
db.Groups.belongsToMany(db.Students, { through: "group_members" }); //<--- a group belongs to many students

db.Students.hasMany(db.Notes); //<--- a student has many notes
db.Notes.belongsTo(db.Students); //<--- a note belongs to a student

db.Subjects.hasMany(db.Notes); //<--- a subject has many notes
db.Notes.belongsTo(db.Subjects); //<--- a note belongs to a subject

db.Students.hasMany(db.Groups, { as: "ownedGroups", foreignKey: "ownerId" }); //<--- a student owns many groups
db.Groups.belongsTo(db.Students, { as: "owner", foreignKey: "ownerId" }); //<--- a group has one owner

module.exports = db;
