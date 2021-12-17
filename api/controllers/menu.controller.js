const db = require("../models");

const Menu = db.menus;
// const { Op } = db.Sequelize;

exports.findAll = async (req, res) => {
  try {
    const data = await Menu.findAll();
    res.send(data);
  } catch (e) {
    res.status(500).send({
      error: e,
      message: e.message || "Unexpected error",
    });
  }
};
