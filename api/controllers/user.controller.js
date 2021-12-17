const db = require("../models");

const User = db.users;
// const { Op } = db.Sequelize;

exports.findAll = async (req, res) => {
  try {
    const data = await User.findAll();
    res.send(data);
  } catch (e) {
    res.status(500).send({
      error: e,
      message: e.message || "Unexpected error",
    });
  }
};
