const db = require("../models");
const { Op, fn, col } = require("sequelize");

const Users = db.users;
const Orders = db.orders;
const Carts = db.carts;

const getTodaysOrderStat = async () => {
  const startTime = new Date(new Date().setHours(0, 0, 0));
  const endTime = new Date(new Date().setHours(23, 59, 59));
  const createdAt = {
    [Op.gt]: startTime,
    [Op.lt]: endTime,
  };
  let data = {};
  let income = 0;
  try {
    const allCarts = await Carts.findAll({
      include: [
        {
          model: Orders,
          where: {
            status: "Complete",
            createdAt,
          },
        },
      ],
    });
    allCarts?.forEach((cart) => {
      income += cart.price * cart.qty;
    });
  } catch (e) {}
  try {
    const placed = await Orders.count({
      where: {
        status: "Placed",
        createdAt,
      },
    });
    const confirm = await Orders.count({
      where: {
        status: "Confirm",
        createdAt,
      },
    });
    const prepared = await Orders.count({
      where: {
        status: "Prepared",
        createdAt,
      },
    });
    const delivered = await Orders.count({
      where: {
        status: "Delivered",
        createdAt,
      },
    });
    const complete = await Orders.count({
      where: {
        status: "Complete",
        createdAt,
      },
    });
    const cancelled = await Orders.count({
      where: {
        status: "Cancelled",
        createdAt,
      },
    });
    const totalOrderToday = await Orders.count({
      where: { createdAt },
    });
    return (data = {
      stat: [
        {
          name: "Placed",
          order: placed,
        },
        {
          name: "Confirm",
          order: confirm,
        },
        {
          name: "Prepared",
          order: prepared,
        },
        {
          name: "Delivered",
          order: delivered,
        },
        {
          name: "Complete",
          order: complete,
        },
        {
          name: "Cancelled",
          order: cancelled,
        },
      ],
      total: totalOrderToday,
      income,
    });
  } catch (err) {
    console.log(err);
    return data;
  }
};

const getYearlyOrderStat = async () => {
  const date = new Date(),
    y = date.getFullYear();
  const firstDayOfYear = new Date(y, 0, 1);
  const lastDayOfYear = new Date(y, 11, 31);
  let data = {};
  
  let income = 0;
  try {
    const allCarts = await Carts.findAll({
      include: [
        {
          model: Orders,
          where: {
            status: "Complete",
            createdAt: { [Op.between]: [firstDayOfYear, lastDayOfYear] },
          },
        },
      ],
    });
    allCarts?.forEach((cart) => {
      income += cart.price * cart.qty;
    });
  } catch (e) {}
  try {
    const placed = await Orders.count({
      where: {
        status: "Placed",
        createdAt: { [Op.between]: [firstDayOfYear, lastDayOfYear] },
      },
    });
    const confirm = await Orders.count({
      where: {
        status: "Confirm",
        createdAt: { [Op.between]: [firstDayOfYear, lastDayOfYear] },
      },
    });
    const prepared = await Orders.count({
      where: {
        status: "Prepared",
        createdAt: { [Op.between]: [firstDayOfYear, lastDayOfYear] },
      },
    });
    const delivered = await Orders.count({
      where: {
        status: "Delivered",
        createdAt: { [Op.between]: [firstDayOfYear, lastDayOfYear] },
      },
    });
    const complete = await Orders.count({
      where: {
        status: "Complete",
        createdAt: { [Op.between]: [firstDayOfYear, lastDayOfYear] },
      },
    });
    const cancelled = await Orders.count({
      where: {
        status: "Cancelled",
        createdAt: { [Op.between]: [firstDayOfYear, lastDayOfYear] },
      },
    });
    const totalOrderThisYear = await Orders.count({
      where: { createdAt: { [Op.between]: [firstDayOfYear, lastDayOfYear] } },
    });
    return (data = {
      stat: [
        {
          name: "Placed",
          order: placed,
        },
        {
          name: "Confirm",
          order: confirm,
        },
        {
          name: "Prepared",
          order: prepared,
        },
        {
          name: "Delivered",
          order: delivered,
        },
        {
          name: "Complete",
          order: complete,
        },
        {
          name: "Cancelled",
          order: cancelled,
        },
      ],
      total: totalOrderThisYear,
      income,
    });
  } catch (err) {
    console.log(err);
    return data;
  }
};

const getMonthlyOrderStat = async () => {
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const firstDayOfMonth = new Date(y, m, 1);
  const lastDayOfMonth = new Date(y, m + 1, 0);
  let data = {};
  
  let income = 0;
  try {
    const allCarts = await Carts.findAll({
      include: [
        {
          model: Orders,
          where: {
            status: "Complete",
            createdAt: { [Op.between]: [firstDayOfMonth, lastDayOfMonth] },
          },
        },
      ],
    });
    allCarts?.forEach((cart) => {
      income += cart.price * cart.qty;
    });
  } catch (e) {}
  try {
    const placed = await Orders.count({
      where: {
        status: "Placed",
        createdAt: { [Op.between]: [firstDayOfMonth, lastDayOfMonth] },
      },
    });
    const confirm = await Orders.count({
      where: {
        status: "Confirm",
        createdAt: { [Op.between]: [firstDayOfMonth, lastDayOfMonth] },
      },
    });
    const prepared = await Orders.count({
      where: {
        status: "Prepared",
        createdAt: { [Op.between]: [firstDayOfMonth, lastDayOfMonth] },
      },
    });
    const delivered = await Orders.count({
      where: {
        status: "Delivered",
        createdAt: { [Op.between]: [firstDayOfMonth, lastDayOfMonth] },
      },
    });
    const complete = await Orders.count({
      where: {
        status: "Complete",
        createdAt: { [Op.between]: [firstDayOfMonth, lastDayOfMonth] },
      },
    });
    const cancelled = await Orders.count({
      where: {
        status: "Cancelled",
        createdAt: { [Op.between]: [firstDayOfMonth, lastDayOfMonth] },
      },
    });
    const totalOrderThisMonth = await Orders.count({
      where: { createdAt: { [Op.between]: [firstDayOfMonth, lastDayOfMonth] } },
    });
    return (data = {
      stat: [
        {
          name: "Placed",
          order: placed,
        },
        {
          name: "Confirm",
          order: confirm,
        },
        {
          name: "Prepared",
          order: prepared,
        },
        {
          name: "Delivered",
          order: delivered,
        },
        {
          name: "Complete",
          order: complete,
        },
        {
          name: "Cancelled",
          order: cancelled,
        },
      ],
      total: totalOrderThisMonth,
      income,
    });
  } catch (e) {
    return data;
  }
};

exports.getStats = async (req, res) => {
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const firstDayOfMonth = new Date(y, m, 1);
  const lastDayOfMonth = new Date(y, m + 1, 0);
  const monthlyOrderStat = await getMonthlyOrderStat();
  const yearlyOrderStat = await getYearlyOrderStat();
  const dailyOrderStat = await getTodaysOrderStat();
  try {
    const users = await Users.count({
      where: {
        type: "customer",
      },
    });

    const totalOrderAllTime = await Orders.count({
      where: { createdAt: { [Op.between]: [firstDayOfMonth, lastDayOfMonth] } },
    });
    let totalEarnings = 0;
    let totalEarningsCurrentMonth = 0;
    try {
      const allCarts = await Carts.findAll({
        include: [
          {
            model: Orders,
            where: { status: "Complete" },
          },
        ],
      });
      allCarts?.forEach((cart) => {
        totalEarnings += cart.price * cart.qty;
      });
    } catch (e) {}
    try {
      const allCarts = await Carts.findAll({
        include: [
          {
            model: Orders,
            where: {
              status: "Complete",
              createdAt: { [Op.between]: [firstDayOfMonth, lastDayOfMonth] },
            },
          },
        ],
      });
      allCarts?.forEach((cart) => {
        totalEarningsCurrentMonth += cart.price * cart.qty;
      });
    } catch (e) {}
    res.status(200).json({
      users,
      orders: {
        currentMonth: monthlyOrderStat,
        currentYear: yearlyOrderStat,
        today: dailyOrderStat,
        totalOrderAllTime,
      },
      totalEarnings,
      totalEarningsCurrentMonth,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
};
