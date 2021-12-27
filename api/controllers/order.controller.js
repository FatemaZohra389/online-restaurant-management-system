const db = require("../models");

const Order = db.orders;
const Cart = db.carts;
const Menu = db.menus;
const User = db.users;

exports.findAll = async (req, res) => {
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
