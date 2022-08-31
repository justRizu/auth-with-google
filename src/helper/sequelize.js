const { DataTypes } = require("sequelize");
const sequelize = require("../database/models/index").sequelize;
const user = require("../database/models/user")(sequelize, DataTypes);

module.exports = { user };
