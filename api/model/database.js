const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const db = {};
const basename = path.basename(module.filename);
const dbConfig = require('./routes/.env')

const sequelize = new Sequelize(process.env.DB_Name, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: process.env.DB_HOST
})

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
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
			console.log('Connection has been established successfully.');
		})
		.catch((err) => {
			console.log('Unable to connect to the database:', err);
		});
		
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.students = require('./students')(sequelize, Sequelize);
db.subjects = require('./subjects')(sequelize, Sequelize);
db.notes = require('./notes')(sequelize,Sequelize);
db.groups = require('./groups')(sequelize, Sequelize);

db.students.belongsToMany(db.groups, {foreignKey: "studentId"}) //<--- a student belongs to many groups
db.students.hasMany(db.notes, {foreignKey: "studentId"})    //<--- a student has many notes
//db.subjects.hasMany(db.subjects,{foreignKey:"name"}) <--- a subject has many notes (see ./models/notes.js)
module.exports = db;