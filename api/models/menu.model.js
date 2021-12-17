module.exports = (sequelize, Sequelize) => {
    const Menu = sequelize.define(
      "menu",
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        photo: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        indexes: [{ unique: true, fields: ["name"] }],
      }
    );
    return Menu;
  };
  