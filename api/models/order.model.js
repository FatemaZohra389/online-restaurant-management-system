module.exports = (sequelize, Sequelize) =>
  sequelize.define("order", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    address: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
