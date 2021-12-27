module.exports = (sequelize, Sequelize) =>
  sequelize.define("cart", {
    orderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: 'order_and_menu',
    },
    menuId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: 'order_and_menu',
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    qty: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
