module.exports = (sequelize, Sequelize) => {
    const Menu = sequelize.define(
      "category",
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        indexes: [{ unique: true, fields: ["name"] }],
      }
    );
    return Menu;
  };
  