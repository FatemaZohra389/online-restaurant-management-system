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

// * Login User
exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({
      message: "Username and Password required!",
    });
    return;
  }
  try {
    const user = await User.unscoped().findOne({
      where: { username: username },
    });
    if (user && (await user.validPassword(password))) {
      delete user.dataValues.password;
      res.send({
        user: user.dataValues,
      });
    } else {
      res.status(403).send({
        message: "Incorrect username/password",
      });
    }
  } catch (err) {
    res.status(500).send({
      error: err,
      message: err.message || "Login failed!",
    });
  }
};

// * Register User
exports.register = async (req, res) => {
  const { username, name, password, address, phone, type = "customer" } = req.body;
  if (!username || !password || !name || !address || !phone) {
    res.status(400).send({
      message: "Fields can not be empty!",
    });
    return;
  }
  const user = {
    username,
    password,
    name,
    address,
    phone,
    type,
  };
  try {
    const newUser = await User.create(user);
    delete newUser.dataValues.password;
    res.send({
      user: newUser,
    });
  } catch (e) {
    res.status(500).send({
      error: e,
      message: e.message || "Some error occurred while registering the User.",
    });
  }
};
