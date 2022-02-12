const db = require("../models");

const Order = db.orders;
const Cart = db.carts;
const Menu = db.menus;
const User = db.users;

exports.findAll = async (req, res) => {
  const query = req.query;
  let params = {};
  if (query.customerId) {
    params.userId = query.customerId;
  }
  if (query.status) {
    params.status = query.status;
  }
  if (query.orderId) {
    params.id = query.orderId;
  }
  let sqlQuery = {
    order: [["id", "DESC"]],
    include: [
      {
        as: "carts",
        model: Cart,
        include: [Menu],
      },
      User,
    ],
  };
  if (params) {
    sqlQuery.where = params;
  }
  try {
    let orderData = await Order.findAll(sqlQuery);
    res.send(orderData);
  } catch (e) {
    res.status(500).send({
      error: e,
      message: e.message || "Unexpected error",
    });
  }
};

exports.findByUser = async (req, res) => {
  const params = req.params;
  try {
    let orderData = await Order.findAll({
      order: [["id", "DESC"]],
      include: [
        {
          as: "carts",
          model: Cart,
          include: [Menu],
        },
        User,
      ],
      where: {
        userId: params.userId,
      },
    });
    res.send(orderData);
  } catch (e) {
    res.status(500).send({
      error: e,
      message: e.message || "Unexpected error",
    });
  }
};

exports.create = async (req, res) => {
  let transaction;
  const params = req.body;
  const { userId, status = "Placed", carts, address } = params;
  try {
    // eslint-disable-next-line prefer-const
    transaction = await db.sequelize.transaction();
    const data = await Order.create({
      userId,
      status,
      address,
    });
    const { id } = data;
    const cartParams = carts.map((cart) => {
      return {
        orderId: id,
        menuId: cart.id,
        name: cart.name,
        price: cart.price,
        qty: cart.qty,
      };
    });
    const cartData = await Cart.bulkCreate([...cartParams]);
    let responseData = {
      ...data.dataValues,
      carts: cartParams,
    };
    console.log({
      cartData,
    });
    await transaction.commit();
    res.send(responseData);
  } catch (e) {
    if (transaction) await transaction.rollback();
    res.status(500).send({
      error: e,
      message: e.message || "Unexpected error",
    });
  }
};

exports.giveReview = async (request, res) => {
  const params = request.body;
  const { review, orderId } = params;

  try {
    const order = await Order.findOne({ where: { id: orderId } });
    if (order) {
      const data = await order.update({ review: review }); // database update query where id = 1/2/3/4
      res.send({
        ...order,
        review,
      });
    } else {
      // send data to frontend
      res.status(404).send({
        message: "No order found",
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

exports.receive = async (request, res) => {
  const params = request.body;
  const { id } = params;

  try {
    const order = await Order.findOne({ where: { id } });
    if (order) {
      const data = await order.update({ status: "Received" }); // database update query where id = 1/2/3/4
      res.send({
        ...order,
        status: "Received",
      });
      global.io.emit("order-received", { ...order, status: "Received" });
    } else {
      // send data to frontend
      res.status(404).send({
        message: "No order found",
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

exports.update = async (request, res) => {
  const params = request.body;
  const { status, id } = params;
  try {
    const order = await Order.findOne({ where: { id: params.id } });
    if (order) {
      const data = await order.update({ status: status }); // database update query where id = 1/2/3/4
      res.send({
        ...order,
        status,
      }); // send data to frontend
    } else {
      res.status(404).send({
        message: "No order found",
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
