module.exports = (sequelize, Sequelize) =>
  sequelize.define("order", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
