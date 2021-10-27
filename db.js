const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  // SQLite only
  storage: "database.sqlite",
});

const Users = sequelize.define("users", {
  userId: {
    type: Sequelize.STRING,
    unique: true,
  },
  score: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Users;
