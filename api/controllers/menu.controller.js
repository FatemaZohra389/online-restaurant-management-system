const db = require("../models");

const Menu = db.menus;
const Category = db.categories;
const { Op } = db.Sequelize;

exports.findAll = async (req, res) => {
  const query = req.query;
  console.log({ query });
  let sqlQuery = { include: [Category] };
  let params = {};
  if (query.categoryId) {
    params.categoryId = query.categoryId;
  }
  if (query.searchValue) {
    params.name = { [Op.like]: "%" + query.searchValue + "%" };
  }
  if (params) {
    sqlQuery.where = params;
  }
  console.log({ sqlQuery });
  try {
    const data = await Menu.findAll(sqlQuery);
    res.send(data);
  } catch (e) {
    res.status(500).send({
      error: e,
      message: e.message || "Unexpected error",
    });
  }
};

exports.create = async (req, res) => {
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

exports.findById = async (request, res) => {
  const params = request.params;
  try {
    const data = await Menu.findOne({
      where: {
        id: params.id,
      },
    });
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: "Menu not found!",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({
      error: e,
      message: e.message || "Unexpected error",
    });
  }
};

exports.createMenu = async (request, res) => {
  const params = request.body;
  try {
    const data = await Menu.create(params);
    res.send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send({
      error: e,
      message: e.message || "Unexpected error",
    });
  }
};

exports.updateMenu = async (request, res) => {
  const params = request.body;
  try {
    const data = await Menu.update(params, { where: { id: params.id } }); // database update query where id = 1/2/3/4
    if (data[0] > 0) {
      // In data, it shows the number of rows update in an array; [ 0 ] if no rows updated
      const menuData = await Menu.findOne({
        // run database get query where id = 1/2/3/4
        where: {
          id: params.id,
        },
      });
      res.send(menuData); // send data to frontend
    } else {
      res.send({
        message: "No menu updated",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({
      error: e,
      message: e.message || "Unexpected error",
    });
  }
};

exports.removeMenu = async (req, res) => {
  const params = req.params;
  try {
    const data = await Menu.destroy({ where: { id: params.id } });
    if (data) {
      res.send({
        message: "Menu deleted",
      });
    } else {
      res.send({
        message: "Menu was not found / failed to delete",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({
      error: e,
      message: e.message || "Unexpected error",
    });
  }
};
