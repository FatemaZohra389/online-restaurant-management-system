const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
    logging: true,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user.model")(sequelize, Sequelize);
db.menus = require("./menu.model")(sequelize, Sequelize);
db.orders = require("./order.model")(sequelize, Sequelize);
db.carts = require("./cart.model")(sequelize, Sequelize);

db.users.hasMany(db.orders, {
  as: "orders",
});
db.orders.belongsTo(db.users, {
  onDelete: "CASCADE",
  foreignKey: { allowNull: false },
  hooks: true,
});

db.orders.hasMany(db.carts, {
  as: "carts",
});

db.menus.hasMany(db.carts, {
  as: "carts",
});
db.carts.belongsTo(db.orders, {
  onDelete: "CASCADE",
  foreignKey: { allowNull: false },
  hooks: true,
});
db.carts.belongsTo(db.menus, {
  // onDelete: "CASCADE",
  foreignKey: { allowNull: false },
  hooks: true,
});

module.exports = db;
